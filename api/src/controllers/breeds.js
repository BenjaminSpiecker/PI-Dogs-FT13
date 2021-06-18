const { Breed, Temperament } = require('../db');
const { Sequelize, Op } = require('sequelize');
const axios = require('axios');

 async function getAllBreedsFromApi() {
   try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    response.data.map( async (breed) => {

      const [min_h, max_h] = stringParseToNumbers(breed.height.metric);
      const [min_w, max_w] = stringParseToNumbers(breed.weight.metric);
      const [min_ls, max_ls] = stringParseToNumbers(breed.life_span);

      const createdBreed = await Breed.create({
        id: breed.id,
        name: breed.name,
        height_max: max_h,
        height_min: min_h,
        weight_max: max_w,
        weight_min: min_w,
        life_span_max: max_ls,
        life_span_min: min_ls,
        image_url: breed.image.url,
        image_id: breed.image.id
      });

      if(breed.temperament) {
        const listTemperaments = breed.temperament.split(', ');

        listTemperaments.map( async (temp) => {
          const [temperament, created] = await Temperament.findOrCreate({
            where: { name: temp },
            default: {
              name: temp
            }
          });
          await createdBreed.addTemperament(temperament);
        });
      }
    });

   } catch (error) {
      console.log(error);
   }
}

function getAllBreeds(req, res, next) {

  const {offset, orderValue, orderOption} = req.query;

  if(offset && orderValue && orderOption) {

    return Breed.findAll({
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        }
      }],
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ]
    }).then( async (rows) => {
        const count = await Breed.count();
        return res.send({ count, rows });
      })
    .catch(error => next(error));
  }
  
  return Breed.findAll({
    limit: 8,
    offset: 0,
    include: [{
      model: Temperament,
      attributes: [ 'id','name'],
      through: {
        attributes: []
      }
    }]
  }).then( async (rows) => {
      const count = await Breed.count();
      return res.send({ count, rows });
    })
    .catch(error => next(error));
}

async function getBreedByName(req, res, next) {

  const {name, offset, orderValue, orderOption} = req.query;

  if(name && offset && orderValue && orderOption) {

    return Breed.findAll({
      where: {
        name: { [Op.iLike]: '%' + name + '%' }
      },
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        }
      }],
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ]
    }).then( async (rows) => {
        const count = await Breed.count({
          where: {
            name: { [Op.iLike]: '%' + name + '%' }
          }
        });
        return res.send({ count, rows });
      })
    .catch(error => next(error));
  }
  
  return Breed.findAll({
    where: {
      name: { [Op.iLike]: '%' + name + '%' }
    },
    limit: 8,
    offset: 0,
    include: [{
      model: Temperament,
      attributes: [ 'id','name'],
      through: {
        attributes: []
      }
    }]
  }).then( async (rows) => {
      const count = await Breed.count({
        where: {
          name: { [Op.iLike]: '%' + name + '%' }
        }
      });
      return res.send({ count, rows });
    })
    .catch(error => next(error));
}

function stringParseToNumbers(string) {
  let numbers = [];
  let disassembledString = [];

  disassembledString = string.trim().split(' ');

  if(disassembledString[0] == 'NaN') {
    numbers.push(0);
    numbers.push(0);
    return numbers;
  }

  if(disassembledString.length >= 2 && disassembledString[1] != 'years') {
    numbers.push(parseInt(disassembledString[0]));
    numbers.push(parseInt(disassembledString[2]));
  } else {
    numbers.push(parseInt(disassembledString[0]));
    numbers.push(parseInt(disassembledString[0]));
  }
  
  return numbers;
}

module.exports = {
  getBreedByName,
  getAllBreedsFromApi,
  getAllBreeds
}

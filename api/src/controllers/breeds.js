const { Breed, Temperament } = require('../db');
const { Sequelize, Op } = require('sequelize');
const axios = require('axios');
const uuid4 = require('uuid4');

 async function getAllBreedsFromApi() {
   try {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    response.data.map( async (breed) => {

      const [min_h, max_h] = stringParseToNumbers(breed.height.metric);
      const [min_w, max_w] = stringParseToNumbers(breed.weight.metric);
      const [min_ls, max_ls] = stringParseToNumbers(breed.life_span);

      const createdBreed = await Breed.create({
        id: uuid4(),
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

async function getAllBreeds(req, res, next) {

  let {offset, orderValue, orderOption} = req.query;

  try {
    const rows = await Breed.findAll({
      // attributes: ['id', 'name', 'image_url'],
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        },
      }],
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ]
    });

    const count = await Breed.count();
    res.send({ count, rows });

  } catch (error) {
    next(error);
  }
}

function getAllBreedsFiltered(req, res, next) {

  let {offset, orderValue, orderOption, filterOption, filterValue} = req.query;

  if(offset && orderValue && orderOption && filterOption && filterValue) {
    if(filterValue === 'none') {filterValue = '';}

    return Breed.findAll({
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        },
        where: {
          name: { [Op.iLike]: '%' + filterValue + '%' }
        }
      }],
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ]
    }).then( async (rows) => {
      let count = 0;

      if(filterValue !== '') {
        count = await Temperament.count({
          where: {
            name: { [Op.iLike]: '%' + filterValue + '%' }
          },
          include: [{
            model: Breed,
          }],
        });
      } else {
        count = await Breed.count();
      }
      
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

  const {name, offset, orderOption, orderValue} = req.query;

  try {
    const rows = await Breed.findAll({
      where: {
        name: { [Op.iLike]: '%' + name + '%' }
      },
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ],
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        }
      }]
    });

    const count = await Breed.count({
      where: {
        name: { [Op.iLike]: '%' + name + '%' }
      }
    });

    return res.send({ count, rows });

  } catch (error) {
    next(error);
  }
}

async function getBreedByNameFiltered(req,res,next) {

  const {name, offset, orderOption, orderValue, filterOption, filterValue} = req.query;

  try {
    const rows = await Breed.findAll({
      where: {
        name: { [Op.iLike]: '%' + name + '%' }
      },
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ],
      include: [{
        model: Temperament,
        attributes: [ 'id','name'],
        through: {
          attributes: []
        },
        where: {
          name: { [Op.iLike]: '%' + filterValue + '%' }
        }
      }]
    });

    const count = await Temperament.count({
      where: {
        name: { [Op.iLike]: '%' + filterValue + '%' }
      },
      include: [{
        model: Breed,
        where: {
          name: { [Op.iLike]: '%' + name + '%' }
        }
      }],
    });

    return res.send({ count, rows });

  } catch (error) {
    next(error);
  }
}
async function getBreedById(req,res,next) {
  try {
    const breedFound = await Breed.findByPk(req.query.id);
    console.log(breedFound);
    return res.send(breedFound);
  } catch (error) {
   next(error);
  }
}

async function postBreed(req,res,next) {
  console.log(req.body);
  const {name, height_max, height_min, weight_max, 
    weight_min, life_span, temperaments} = req.body;

  if(!name || !height_max || !height_min || !weight_max
    || !weight_min || !life_span || !temperaments) {
      return res.status(400).send('wrong post');
    } 
  
  try {
    const createdBreed = await Breed.create({
      id: uuid4(),
      name: name,
      height_max: height_max,
      height_min: height_min,
      weight_max: weight_max,
      weight_min: weight_min,
      life_span_max: life_span,
      life_span_min: life_span,
      // image_url: breed.image.url,
      // image_id: breed.image.id
    });

    if(temperaments.length > 0) {
      temperaments.map( async (temp) => {
        const [temperament, created] = await Temperament.findOrCreate({
          where: { name: temp },
          default: {
            name: temp
          }
        });
        await createdBreed.addTemperament(temperament);
      });
    }
    return res.status(200).send('correct post');
  } catch (error) {
    console.log(error);
    return res.status(400).send('wrong post')
  }
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
  getAllBreeds,
  getAllBreedsFiltered,
  getBreedByNameFiltered,
  getBreedById,
  postBreed
}

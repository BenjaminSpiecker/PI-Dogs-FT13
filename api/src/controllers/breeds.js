const { Breed, Temperament } = require('../db');
const { Sequelize } = require('sequelize');
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

    return Breed.findAndCountAll({
      limit: 8,
      offset: offset,
      order: [
        [orderOption, orderValue]
      ]
    }).then( response => {
      return res.send(response);
    })
    .catch(error => next(error));
  }
  
  return Breed.findAndCountAll({
    limit: 8,
    offset: 0
  }).then( response => {
    return res.send(response);
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
  getAllBreedsFromApi,
  getAllBreeds
}

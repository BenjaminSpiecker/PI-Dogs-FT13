const { Breed, Temperament } = require('../db');
const { Sequelize, Op } = require('sequelize');
const axios = require('axios');

function getAllTemperaments(req, res, next) {
    Temperament.findAndCountAll({
        attributes: ['id', 'name']
    })
        .then( response => {
            res.send(response);
        })
        .catch( error => console.log(error));

}

module.exports = {
    getAllTemperaments
}
  
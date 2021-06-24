const { Router } = require('express');
const axios = require('axios');
const { 
    getAllBreeds, 
    getAllBreedsFiltered, 
    getBreedByName, 
    getBreedByNameFiltered,
    getBreedById,
    postBreed } = require('../controllers/breeds');

const router = Router();

router.get('/', (req, res, next)  => {
    if(req.query.id) {
        return getBreedById(req,res,next);
    }
    (!req.query.orderOption) 
        ? req.query.orderOption = 'name' 
        : req.query.orderOption;
    (!req.query.orderValue) 
        ? req.query.orderValue = 'ASC' 
        : req.query.orderValue;
    (!req.query.offset) 
        ? req.query.offset = 0 
        : req.query.offset;

    if(req.query.name) {
        if( req.query.filterOption 
            && req.query.filterValue 
            && req.query.filterValue !== 'none') {
            return getBreedByNameFiltered(req,res,next);
        } else {
            return getBreedByName(req,res,next);
        }
    } else{
        if( req.query.filterOption 
            && req.query.filterValue 
            && req.query.filterValue !== 'none') {
            return getAllBreedsFiltered(req,res,next);
        } else {
            return getAllBreeds(req, res, next);
        }
    }
});

router.post('/', (req,res,next) => postBreed(req,res,next));

module.exports = router;

const { Router } = require('express');
const axios = require('axios');
const { 
    getAllBreeds, 
    getAllBreedsFiltered, 
    getBreedByName, 
    getBreedByNameFiltered } = require('../controllers/breeds');

const router = Router();

router.use('/', (req, res, next)  => {
    
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
})

router.use('/:id', )
module.exports = router;

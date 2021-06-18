const { Router } = require('express');
const axios = require('axios');
const { getAllBreeds, getBreedByName } = require('../controllers/breeds');

const router = Router();

router.use('/', (req, res, next)  => {
    const {name} = req.query;
    if(name) {
        return getBreedByName(req,res,next);
    }
    return getAllBreeds(req, res, next);
})
module.exports = router;

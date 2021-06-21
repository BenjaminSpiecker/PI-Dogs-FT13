const { Router } = require('express');
const axios = require('axios');
const { getAllTemperaments } = require('../controllers/temperaments');

const router = Router();

router.use('/', (req, res, next)  => {
    return getAllTemperaments(req,res,next);
})
module.exports = router;

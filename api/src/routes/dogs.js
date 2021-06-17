const { Router } = require('express');
const axios = require('axios');
const { getAllBreeds } = require('../controllers/breeds');

const router = Router();

router.use('/', (req, res, next)  => getAllBreeds(req, res, next));

module.exports = router;

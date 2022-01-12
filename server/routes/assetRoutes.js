const express = require('express');
const assetController = require('./../controllers/assetsController');

const router = express.Router();

router.get('/assets', assetController.getCategory);

router.get('/:asset/:tf/:start/:count', assetController.getAssets);



module.exports = router;

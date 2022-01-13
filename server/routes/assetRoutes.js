const express = require('express');
const assetController = require('./../controllers/assetsController');

const router = express.Router();

router.get('/assets', assetController.getCategory);

router.get('/tf', assetController.getTimeFrame);

router.get('/:asset/:tf/:start/:count', assetController.getAssets);



module.exports = router;

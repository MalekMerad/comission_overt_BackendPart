const express = require('express');
const router = express.Router();
const lotController = require('../Controllers/lotsController/lotController');

router.post('/addLot', lotController.insertLotSqlServer); 
router.get('/getLots', lotController.getAllLotsSqlServer);

module.exports = router;

const express = require('express');
const router = express.Router();
const lotController = require('../Controllers/LotsController/LotsController');

router.post('/addLot', lotController.insertLotSqlServer);
router.get('/getAllLots', lotController.getAllLotsSqlServer);
router.put('/updateLot/:id', lotController.updateLotSqlServer);
router.delete('/deleteLot/:id', lotController.deleteLotSqlServer);

module.exports = router;

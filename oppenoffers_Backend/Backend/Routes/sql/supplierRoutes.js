const express = require('express');
const router = express.Router();
const supplierController = require('../../Controllers/sql/supplierController');

router.post('/addSupplier', supplierController.addSupplier);

module.exports = router;
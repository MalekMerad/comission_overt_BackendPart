const express = require('express');
const router = express.Router();
const operationsConteoller = require('../Controllers/operationsController/operationController')


router.post('/addOperation',operationsConteoller.operationSqlServer);

module.exports = router;
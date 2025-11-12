const express = require('express');
const router = express.Router();
const operationsController = require('../Controllers/operationsController/operationController');

router.post('/addOperation', operationsController.insertOperationSqlServer);
router.get('/AllOperations', operationsController.getAllOperationsSqlServer);
router.delete('/deleteOperation/:NumOperation', operationsController.deleteOperationSqlServer);

module.exports = router;

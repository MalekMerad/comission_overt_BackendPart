const express = require('express');
const router = express.Router();
const operationsConteoller = require('../Controllers/operationsController/operationController')


router.post('/addOperation',operationsConteoller.insertOperationSqlServer);
router.get('/operations', operationsConteoller.getAllOperationsSqlServer);
router.delete('/delOperation', operationsConteoller.deleteOperationSqlServer);

module.exports = router;
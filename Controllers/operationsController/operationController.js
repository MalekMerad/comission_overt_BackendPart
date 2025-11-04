// operationController.js
const operationService = require('../../Services/Operations Services/operationServices');

module.exports = {
    insertOperationSqlServer: async (req, res) => {
        try {
            const {
                NumOperation,
                ServContract,
                Objectif,
                TravalieType,
                BudgetType,
                MethodAttribuation,
                VisaNum,
                DateVisa,
                adminID
            } = req.body;

            console.log('Received data:', req.body);

            if (
                !NumOperation ||
                !ServContract ||
                !Objectif ||
                !TravalieType ||
                !BudgetType ||
                !MethodAttribuation ||
                !VisaNum ||
                !DateVisa ||
                !adminID
            ) {
                return res.status(400).json({ 
                    error: "All fields are required.",
                    received: req.body 
                });
            }

            const operation = await operationService.addOperationSQLServer(
                NumOperation,
                ServContract,
                Objectif,
                TravalieType,
                BudgetType,
                MethodAttribuation,
                VisaNum,
                DateVisa,
                adminID
            );
            console.log('Operation result:', operation);

            return res.status(201).json({
                message: "Operation processed successfully.",
                operation
            });

        } catch (error) {
            console.error("Error while adding operation:", error.message);
            return res.status(500).json({
                error: "An error occurred while adding the operation.",
                details: error.message
            });
        }
    },
    getAllOperationsSqlServer: async (req, res) => {
        try {
            const { adminID } = req.query;
            
            // Add validation for adminID
            if (!adminID) {
                return res.status(400).json({
                    success: false,
                    message: 'adminID is required',
                    data: []
                });
            }
    
            const result = await operationService.getAllOperationSQLServer(adminID);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: 'Operations retrieved successfully',
                    data: result.data,
                    count: result.count
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: result.message || 'Failed to retrieve operations',
                    data: []
                });
            }
        } catch (error) {
            console.error('Controller error in getAllOperations:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: []
            });
        }
    },
    deleteOperationSqlServer: async (req,res)=>{
        try {
            const {idOperation} = req.body;

            if(!idOperation){
                return res.status(400).json({
                    success: false,
                    message: 'operationID is required'
                });
            }
            const result = await operationService.deleteOperationByIdSqlServer(idOperation);

            if(result.success){
                res.status(200).json({
                    success : true,
                    message: 'operationID is deleted'
                })
            }else{
                res.status(500).json({
                    success : false,
                    message: result.message ||'Failed to deleted operations'
                })
            }

        } catch (error) {
            console.error('Controller error in deleteOperation:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}
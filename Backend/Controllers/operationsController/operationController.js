// operationController.js
const operationService = require('../../Services/Operations Services/operationServices');

module.exports = {
    operationSqlServer: async (req, res) => {
        try {
            const {
                NumOperation,
                ServContract,
                Objectif,
                TravalieType,
                BudgetType,
                MethodAttribuation,
                VisaNum,
                DateVisa
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
                !DateVisa
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
                DateVisa
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
    }
}
const lotService = require('../../Services/Lots Services/lotsServices');

module.exports = {
    insertLotSqlServer: async (req, res) => {
        try {
            const { NumeroLot, id_Operation, Designation, adminId } = req.body;

            if (
                !NumeroLot ||
                !id_Operation ||
                !Designation ||
                !adminId
            ) {
                return res.status(400).json({
                    success: false,
                    error: "All fields must be filled",
                    body: req.body
                });
            }

            const result = await lotService.addNewLotSqlServer(
                NumeroLot,
                id_Operation,
                Designation,
                adminId
            );

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    code: result.code,
                    message: result.message
                });
            } else {
                let status = result.code === 1001 ? 409 : 500;
                return res.status(status).json({
                    success: false,
                    code: result.code,
                    message: result.message,
                    error: result.error || undefined
                });
            }
        } catch (error) {
            console.error('Error in insertLotSqlServer:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    getAllLotsSqlServer : async(req,res)=>{
        try {
            const { adminID } = req.query;

            if (!adminID) {
                    return res.status(400).json({
                        success: false,
                        message: 'adminID is required',
                        data: []
                    });
                }
            const result = await lotService.getAllLotsSqlServer(adminID);
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: 'Lots retrieved successfully',
                    data: result.data,
                    count: result.count
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to retrieve lots',
                    data: []
                });
            }
        } catch (error) {
            console.error('Controller error in getAllLotSqlServer:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: []
            });
        }
    }
}
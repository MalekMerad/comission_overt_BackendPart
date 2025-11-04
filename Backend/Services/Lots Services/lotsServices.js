const { MAX } = require('mssql');
const {poolPromise , sql} = require('../../Config/dbSqlServer');

module.exports = {
    addNewLotSqlServer : async(
        NumeroLot,id_Operation,Designation,adminId
    )=>{
        try {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('NumeroLot',sql.NVarChar(255), NumeroLot)
            .input('id_Operation',sql.UniqueIdentifier, id_Operation)
            .input('Designation',sql.NVarChar(MAX),Designation)
            .input('adminId',sql.UniqueIdentifier, adminId)
            .execute('insertNewLot')

            const insertResult = result.returnValue;

            if(insertResult == 0){
                return { success: true, code: 0, message: 'Lot added successfully.' };
            } else if(insertResult == 1001){
                return { success: false, code: 1001, message: 'Lot already exists.' };
             }else{
                return { success: false, code: 5000, message: 'General error.' };
                }
        } catch (error) {
            console.log("(Lot services error ): ", error);
            return { success: false, code: 5000, message: 'General error occurred.', error: error.message };
        }
    },
    getAllLotsSqlServer: async(adminID) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('adminID', sql.UniqueIdentifier, adminID)
                .query(`SELECT * FROM dbo.getAllLots(@adminID)`);
    
            const lots = result.recordset;
            
            return {
                success: true,
                data: lots,
                count: lots.length
            }
        } catch (error) {
            console.log('Get lots service error: ', error);
            return {
                success: false,
                data: error.message, // Return error message instead of full error object
                count: 0
            }
        }
    }
}
const { poolPromise, sql } = require('../config/db');

module.exports = {
  getUsers: async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('usp_GetAllUsers'); // Ism Procedure wl Fonction li ra7 t3aytolha mn la base 
    return result.recordset;
  },

  getUserById: async (userId) => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UserID', sql.Int, userId) // Hada exmpl 3la params
      .execute('usp_GetUserById'); // Ism Procedure wl Fonction li ra7 t3aytolha mn la base 
    
    if (!result.recordset[0]) throw new Error('User not found');
    return result.recordset[0];
  }
};
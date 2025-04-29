const { poolPromise, sql } = require('../config/db');

module.exports = {

  // Khadmat service hiya yjib Request mn controller w yrj3ha logic w yjib data mn db
// W mba3d ymdha l controller
  loginUser: async (email, password) => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Email', sql.NVarChar(100), email)
      .input('Password', sql.NVarChar(100), password) // Hada exmpl 3la params
      .execute('usp_LoginUser'); // Ism Procedure wl Fonction li ra7 t3aytolha mn la base
     
    if (!result.recordset[0]) {
      throw new Error('Invalid credentials');
    }
    return result.recordset[0];
  },

  registerUser: async (userData) => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Name', sql.NVarChar(100), userData.name)
      .input('Email', sql.NVarChar(100), userData.email)
      .input('Password', sql.NVarChar(100), userData.password) // Hada exmpl 3la params
      .execute('usp_RegisterUser'); // Ism Procedure wl Fonction li ra7 t3aytolha mn la base
    
    return result.recordset[0];
  }
};
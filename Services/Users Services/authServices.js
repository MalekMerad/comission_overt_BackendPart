const { poolPromise, sql } = require('../../Config/dbSqlServer');
const dbSql = require('../../Config/dbSql');

module.exports = {
  loginUserSqlServer: async (email, password) => {
    try {
      console.log('Service received:', email, password);
      const pool = await poolPromise;
      const result = await pool.request()
        .input('email', sql.NVarChar(255), email)
        .input('password', sql.NVarChar(50), password)
        .execute('loginUser');
      console.log('(Service) SQL result:', result.recordset); 

      if (!result.recordset[0]) {
        throw new Error('Invalid credentials');
      }
      const userId = result.recordset[0].userId;

      return {
        success: true,
        userId: userId,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Auth service error:', error.message);
      throw error;
    }
  },

  loginUserSQL: async (user) => {
    try {
      const { email, password} = user;
      const sqlQuery = `INSERT INTO Users (Email, Password) VALUES (?, ?, ?)`;
      const params = [email, password, name];
      const [result] = await dbSql.query(sqlQuery, params);
      return {
        success: true,
        userId: result.insertId,
        message: 'User created successfully (plain SQL)'
      };
    } catch (error) {
      console.error('Auth service (plain SQL) error:', error.message);
      throw error;
    }
  }
};
const { poolPromise, sql } = require('../Config/db');

module.exports = {
  
    // Hada endPoint li ra7 nkhdmo bih fi api
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const pool = await poolPromise;
      
      const result = await pool.request()
        .input('Email', sql.NVarChar(100), email)
        .input('Password', sql.NVarChar(100), password)
        .execute('usp_LoginUser'); // Hada ism Procedures mn dataBase

      if (!result.recordset[0]) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({
        token: result.recordset[0].Token,
        user: {
          id: result.recordset[0].UserID,
          name: result.recordset[0].Name
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  register: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Name', sql.NVarChar(100), req.body.name)
        .input('Email', sql.NVarChar(100), req.body.email)
        .input('Password', sql.NVarChar(100), req.body.password)
        .execute('usp_RegisterUser');

      res.status(201).json({
        id: result.recordset[0].UserID,
        name: result.recordset[0].Name,
        email: result.recordset[0].Email
      });
    } catch (err) {
      res.status(400).json({ error: 'Registration failed' });
    }
  },

};
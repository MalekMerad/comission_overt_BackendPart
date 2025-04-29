const { poolPromise, sql } = require('../Config/db');

module.exports = {
    // hado endpoint ta3 api 
  getAllUsers: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .execute('usp_GetAllUsers'); // hada procedure mn la base de donnes 
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },


  getUserById: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('UserID', sql.Int, req.params.id)
        .execute('usp_GetUserById');

      if (!result.recordset[0]) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('UserID', sql.Int, req.params.id)
        .input('Name', sql.NVarChar(100), req.body.name) // Hado params lazmin ta3 function/procedures
        .input('Email', sql.NVarChar(100), req.body.email)
        .execute('usp_UpdateUser');

      res.json(result.recordset[0]);
    } catch (err) {
      res.status(400).json({ error: 'Update failed' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('UserID', sql.Int, req.params.id)
        .execute('usp_DeleteUser');

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Deletion failed' });
    }
  }
};
const { poolPromise, sql } = require('../Config/db');

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Access denied' });

      const pool = await poolPromise;
      const result = await pool.request()
        .input('Token', sql.NVarChar(500), token)
        .execute('usp_ValidateToken');

      if (!result.recordset[0]?.IsValid) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = result.recordset[0];
      next();
    } catch (err) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
};
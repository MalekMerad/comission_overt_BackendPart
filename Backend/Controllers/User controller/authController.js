const authService = require('../../Services/Users Services/authServices');

module.exports = {

  loginSqlServer: async (req, res) => {
    try {
      const { Email, Password } = req.body;
      console.log('Controller (SQL Server) received:', Email, Password); 
      const user = await authService.loginUserSqlServer(Email, Password); 
      res.json(user);
    } catch (err) {
      console.error('Controller (SQL Server) error:', err.message);      
      res.status(401).json({ error: err.message });
    }
  },

  loginSQL: async (req, res) => {
    try {
      const { Email, Password } = req.body;
      console.log('Controller (SQL) received:', Email, Password);
      const user = await authService.loginUserSQL(Email, Password);
      res.json(user);
    } catch (err) {
      console.error('Controller (SQL) error:', err.message);
      res.status(401).json({ error: err.message });
    }
  }
};
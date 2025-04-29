const authService = require('../Services/authServices');


// Khadmat controller hiya yjib Request mn client side w yb3tha l service
// W yjib data mn service w ymdha l frontend
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.loginUser(email, password); // Hada service li tjibo mn Services
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  register: async (req, res) => {
    try {
      const newUser = await authService.registerUser(req.body); // Hada service li tjibo mn Services
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
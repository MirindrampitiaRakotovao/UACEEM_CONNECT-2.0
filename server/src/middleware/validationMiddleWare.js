// middleware/validationMiddleware.js
const { validationResult } = require('express-validator');
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Erreurs de validation',
      erreurs: errors.array() 
    });
  }
  next();
};
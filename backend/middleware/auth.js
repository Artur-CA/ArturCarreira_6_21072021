// Import package tokens d'authentification
const jwt = require('jsonwebtoken');


// Création du middleware d'authentification 
module.exports = (req, res, next) => 
{
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Fonction verify de jsonwebtoken pour décoder le token
    const userId = decodedToken.userId; // Récupération du userID
    if (req.body.userId && req.body.userId !== userId) { // Vérification de la correspondance entre userID de la requête et du token
      throw 'User ID non valable';
    } else {
      next(); 
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};
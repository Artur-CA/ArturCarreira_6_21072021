// Package bcrypt pour chiffrage du mot de passe 
const bcrypt = require('bcrypt');

// Package pour créer et vérifier des tokens d'authentification
const jwt = require('jsonwebtoken');

// Import de l'utilisateur
const User = require('../models/user');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => 
{
  bcrypt.hash(req.body.password, 10) //  Appel de la fonction de hachage de bcrypt (cryptage du mdp 10 fois = sécurisation)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Connexion de l'utilisateur
exports.login = (req, res, next) => 
{
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Fonction compare de bcrypt qui compare le mdp entré par l'utilisateur avec le hash enregistré dans la base de données
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( // Fonction sign de jsonwebtoken pour encoder un nouveau token 
              { userId: user._id },
              'RANDOM_TOKEN_SECRET', // Clé d'encodage
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
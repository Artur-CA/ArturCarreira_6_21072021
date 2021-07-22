const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import Body-parser
const mongoose = require('mongoose'); // Import Mongoose 

const userRoutes = require('./routes/user'); // Import router utilisateur

const app = express(); // Création application Express

// Connexion MongoDB
mongoose.connect('mongodb+srv://artur:arturOC@cluster0.amdby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Modification en objet JS
app.use(bodyParser());

// Acçès aux routes pour les utilisateurs
app.use('/api/auth', userRoutes);

// Export application Express
module.exports = app;
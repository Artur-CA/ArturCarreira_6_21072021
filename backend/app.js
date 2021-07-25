const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const path = require('path'); // Donne acçès au chemin du système de fichiers

const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauce'); 

const app = express(); // Création application Express

// Connexion MongoDB
mongoose.connect('mongodb+srv://artur:arturOC@cluster0.amdby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware CORS  (système de sécurité qui bloque les requêtes malveillantes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Modification en objet JS
app.use(bodyParser.json());

// Acçès aux routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Méthode path.join() pour récupérer les images du dossier

// Export application Express
module.exports = app;
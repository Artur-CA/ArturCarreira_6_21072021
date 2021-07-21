const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://artur:arturOC@cluster0.amdby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.use('/api/sauces', (req, res, next) => {
  const sauces = [
      {
        _id: 'string',
        name: 'string',
        manufacturer: 'string',
        description: 'string',
        heat: 'number',
        likes: 'number',
        dislikes: 'number',
        imageUrl: 'string',
        mainPepper: 'string',
        usersLiked: 'string[]',
        usersDisliked: 'string[]',
        userId: 'string'
      }
    ];
    
  res.status(200).json(sauces);
  });

module.exports = app;
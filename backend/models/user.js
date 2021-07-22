// Import Mongoose
const mongoose = require('mongoose');

// Package pour vérifier que l'adresse e-mail n'est pas déjà utilisée
const uniqueValidator = require('mongoose-unique-validator');

// Structure du schéma "User"
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
// Import package multer
const multer = require('multer');

// Création d'un dictionnaire
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


// Création objet de configuration pour multer

const storage = multer.diskStorage({ // Fonction de multer qui enregistre sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // Création d'un nom du fichier unique pour éviter les problèmes de doublons
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');

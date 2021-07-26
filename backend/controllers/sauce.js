// Import modèle de données "sauce"
const Sauce = require('../models/sauce');

// Import package fs (acçès aux opérations liées au système de fichiers)
const fs = require ('fs');

// Création sauce
exports.createSauce = (req, res, next) => 
{
    const sauceObject = JSON.parse(req.body.sauce); // Extrait l'objet json de la chaîne de caractères
    delete sauceObject._id;   // Supprime le champs ID (généré par frontend) du corps de la requête avant de copier l'objet
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   
    });
    sauce.save() // Méthode save() qui enregistre l'objet dans la base de données
    .then( () => res.status(201).json({ message: 'Sauce sauvegardée !'}))
    .catch( error => res.status(400).json({ error }))
};

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => 
{
    Sauce.find() // Méthode find() qui renvoie un tableau contenant toutes les sauces de la base de données
    .then( sauces => res.status(200).json(sauces))
    .catch( error => res.status(400).json({ error }))
};

// Récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => 
{
    Sauce.findOne({_id : req.params.id}) // Méthode findOne() qui renvoie la sauce ayant le même ID que celui de la requête
    .then( sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({ error }))
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => 
{
    const sauceObject = req.file ? // Utilisation de l'opérateur ternaire pour savoir "req.file" existe
    { // Récupération chaîne de caractères, parse en objet et modification imageUrl
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } 
      // Sinon récupération du corps de la requête et mise à jour
    : { ...req.body };
         // Méthode updateOne() qui met à jour une sauce dans la base de données (vérification ID et incrémentation nouvelle version de l'objet)
    Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id: req.params.id}) 
    .then( () => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch( error => res.status(400).json({ error }))
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Récupération nom du fichier
        fs.unlink(`images/${filename}`, () => { // Fonction unlink() du package fs qui supprime le fichier du dossier
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};
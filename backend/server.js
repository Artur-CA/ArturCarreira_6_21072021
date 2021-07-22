// Import package http de Node
const http = require('http');

// Import application
const app = require('./app');

// Indication du port à l'application
app.set('port', process.env.PORT || '3000');

// Création du serveur
const server = http.createServer(app);

// Indication du port à utiliser par le serveur
server.listen(process.env.PORT || '3000');

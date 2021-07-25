const http = require('http'); // Import package http de Node

const app = require('./app'); // Import application

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => 
{
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); // Indication du port à utiliser par l'application
app.set('port', port);

// La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée, puis les enregistre dans le serveur
const errorHandler = error => 
{
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':   // EACCES : permission denied
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':   // EADDRINUSE: port already in use
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // Création du serveur

// Lance le serveur et affiche sur quel port se connecter ou gère les erreurs
server.on('error', errorHandler);
server.on('listening', () => {   // Ecouteur d'évènements qui enregistre le port sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // Indication du port à écouter par le serveur

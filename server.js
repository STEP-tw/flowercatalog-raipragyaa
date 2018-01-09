const fs = require('fs');
const webApp = require('./webApp.js');
const PORT = 2000;
const http = require('http');
const readCommonFiles = require('./fileHandler.js').readCommonFiles;
const redirectToHome = require('./fileHandler.js').redirectToHome;

const app = webApp.create();

app.get('/',redirectToHome);

app.useAsPostProcessor(readCommonFiles);

let server = http.createServer(app);

server.listen(PORT);
console.log(`Listening on ${PORT}`);

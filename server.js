const webApp = require('./webApp.js');
const PORT = 2000;
const http = require('http');
const readCommonFiles = require('./fileHandler.js').readCommonFiles;
const redirectToHome = require('./fileHandler.js').redirectToHome;
const redirectToGuestBook = require('./fileHandler.js').redirectToGuestBook;

const app = webApp.create();

app.get('/',redirectToHome);
app.post('/guestBook',redirectToGuestBook);
app.useAsPostProcessor(readCommonFiles);
let server = http.createServer(app);

server.listen(PORT);
console.log(`Listening on ${PORT}`);

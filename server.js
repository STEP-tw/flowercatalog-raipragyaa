const webApp = require('./webApp.js');
const PORT = 2000;
const http = require('http');
const readCommonFiles = require('./fileHandler.js').readCommonFiles;
const redirectToHome = require('./fileHandler.js').redirectToHome;
const redirectToGuestBook = require('./fileHandler.js').redirectToGuestBook;

const app = webApp.create();

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.txt',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}


app.get('/',redirectToHome);
app.post('/guestBook',redirectToGuestBook);
app.useAsPostProcessor(readCommonFiles);
let server = http.createServer(app);

server.listen(PORT);
console.log(`Listening on ${PORT}`);

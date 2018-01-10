const fs = require('fs');
const http = require('http');
const PORT = 2000;
const webApp = require('./webApp.js');
const fileHndr  = require('./fileHandler.js');
const commentHndr = require('./commentHandler.js');

const app = webApp.create();

const registeredUsers = [{userName:'pragya',name:'Pragya Rai'},{userName:'priya',name:'Priya Rai'}];

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
};

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

app.use(logRequest);

app.use(fileHndr.redirectToHome);

app.use(loadUser);

app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.redirect('./loginForm.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('./guestBook.html');
});

app.post('/guestBook',commentHndr.storeNamesAndComments);

app.get('/guestBook.html',commentHndr.updateComments)

app.useAsPostProcessor(fileHndr.readCommonFiles);
let server = http.createServer(app);

server.listen(PORT);
console.log(`Listening on ${PORT}`);

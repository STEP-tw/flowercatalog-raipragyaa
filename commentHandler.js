const fs = require('fs');

const getDateTime = () => {
  let date = new Date();
  return date.toLocaleString();
};

const getDatabase = function(){
  let databaseContents  = fs.readFileSync('./database/comment.json');
  let database = JSON.parse(databaseContents);
  return database;
};

const storeNamesAndComments = (req,res) => {
  let nameAndComment = req.body;
  nameAndComment.dateTime = getDateTime();
  let database = getDatabase();
  console.log(database);
  database.unshift(nameAndComment);
  let allComments = JSON.stringify(database, null, 1);
  fs.writeFileSync('./database/comment.json', allComments);
  res.redirect('/guestBook.html');
};

const commentsInHtml = function(comments){
  let contents = `<pre>`
  comments.map(function(ele){
    contents +=`
     Date:${ele.dateTime}
     Name:${ele.Name}
     Comment:${ele.Comment}</br></br>`
  });
  contents += `</pre>`;
  return contents;
};

const updateComments = function(req,res){
  let guestBookContents = fs.readFileSync('./public/guestBook.html','utf8');
  let contentsToWrite = guestBookContents.replace(/nameAndComments/,commentsInHtml(getDatabase()));
  res.write(contentsToWrite);
  res.end();
};
``
exports.storeNamesAndComments = storeNamesAndComments;
exports.updateComments = updateComments;

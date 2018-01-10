const fs = require('fs');
const getContentType = function(filePath) {
  let fileExtention = filePath.slice(filePath.lastIndexOf('.'));
  let headers = {
    '.js': 'text/js',
    '.css': 'text/css',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.html': 'text/html',
    '.gif': 'image/gif',
    '.pdf': 'text/pdf',
    '.ico': 'text/plain'
  }
  return headers[fileExtention];
};

const redirectToHome = function(req, res) {
  if(req.url=='/') res.redirect('./index.html');
};

const respondOnFileNotFound = function(req, res) {
  res.statusCode = 404;
  res.write('file not found');
  res.end();
};

const readCommonFiles = function(req, res) {
  let filePath = 'public' + req.url;
  let headers = getContentType(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) return respondOnFileNotFound(req, res);
    res.setHeader('Content-Type', headers);
    res.write(data);
    res.end();
  })
};

exports.readCommonFiles = readCommonFiles;
exports.redirectToHome = redirectToHome;

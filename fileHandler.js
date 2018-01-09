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
  res.redirect('./index.html');
};

const redirectToGuestBook = function(req, res) {
  res.redirect('./guestBook.html');
};

const respondOnFileNotFound = function(req, res) {
  res.statusCode = 404;
  res.write('file not found');
  res.end();
};

const readCommonFiles = function(req, res) {
  let filePath = 'public' + req.url;
  let headers = getContentType(filePath);
  res.setHeader('Content-Type', headers);
  req.fs.readFile(filePath, (err, data) => {
    if (err) return respondOnFileNotFound(req, res);
    res.write(data);
    res.end();
  })
};

exports.readCommonFiles = readCommonFiles;
exports.redirectToHome = redirectToHome;

const getDateTime = () => {
  let date = new Date();
  return date.toLocaleString();
};

const storeNamesAndComments = (data) => {
  let nameAndComment = parseQueryParam(data);
  nameAndComment.dateTime = getDateTime();
  database.unshift(nameAndComment);
  let allComments = JSON.stringify(database, null, 1);
  res.fs.writeFileSync('./database/comment.json', allComments);
};

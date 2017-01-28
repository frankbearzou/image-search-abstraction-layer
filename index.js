var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');

const app = express();
const url = process.env.MONGOLAB_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('PORT', process.env.PORT || 5000);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  require('./routes')(app, db);

  app.listen(app.get('PORT'), () => console.log(`Example app listening on port ${app.get('PORT')}!`));
});

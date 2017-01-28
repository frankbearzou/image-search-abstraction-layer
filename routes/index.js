var imagesearch = require('./imagesearch');
var latest = require('./latest');

module.exports = (app, db) => {
  console.log('routes: ');
  // app.use('/api', imagesearch);
  // app.use('/api', latest);
  imagesearch(app, db);
  latest(app, db);
};
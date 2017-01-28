var imageSearch = require('node-google-image-search');

module.exports = (app, db) => {
  app.get('/api/imagesearch/:q' , (req, res) => {
    const search_term = req.params.q;
    const start = req.query.offset;
    let data = [];

    // search image
    imageSearch(search_term, (results) => {
      if (results.length === 0) {
        res.json(results);
      } else if (results[0].message) {
        res.json(results);
      } else {
        results.forEach((item) => {
          data.push({
            "url": item.link,
            "snippet": item.snippet,
            "thumbnail": item.image.thumbnailLink,
            "context": item.image.contextLink
          });
        });

        res.json(data);
      }
    }, start);

    // insert search term to database
    db.collection('image-search-abstraction-layer').insertOne({
      "term": search_term,
      "time": new Date()
    });

  });
};

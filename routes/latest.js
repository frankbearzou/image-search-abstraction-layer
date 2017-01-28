module.exports = (app, db) => {
  app.get('/api/latest/imagesearch', (req, res) => {
    db.collection('image-search-abstraction-layer')
      .find({}, {_id: 0}).sort({time: -1})
      .limit(10)
      .toArray((err, docs) => {
        if (err) res.send(err);
        res.json(docs);
      });

  });
};
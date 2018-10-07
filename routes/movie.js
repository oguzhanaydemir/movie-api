const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    status: 1
  });
});

router.post('/', (req, res, next) => {
  const { title, category, country, year, imdb_score } = req.body;

  const movie = new Movie({
    title, category, country, year, imdb_score
  });

  movie.save()
    .then((data) => {
      res.json({
        status: 1
      });
    })
    .catch((err) => {
      res.json({
        status: 0
      });
    });


});

module.exports = router;

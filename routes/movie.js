const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

/* GET movie listing. */
router.get("/", (req, res, next) => {
  Movie.aggregate([
    {
      $lookup: {
        from: "directors",
        localField: "director_id",
        foreignField: "_id",
        as: "director"
      }
    },
    {
      $unwind: "$director"
    }
  ])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});



/* POST a movie */
router.post("/", (req, res, next) => {
  const { title, category, country, year, imdb_score } = req.body;

  const movie = new Movie({
    title,
    category,
    country,
    year,
    imdb_score
  });

  movie
    .save()
    .then(data => {
      res.json({
        status: 1,
        data: [data]
      });
    })
    .catch(err => {
      res.json({
        status: 0
      });
    });
});

/*GET TOP5 List */
router.get("/top5", (req, res, next) => {
  const id = req.params.id;

  Movie.find({})
    .limit(5)
    .sort({ imdb_score: -1 })
    .then(data => {
      if (!data) next({ message: "Data was not found" });
      else res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

/*GET a movie by id */
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data) next({ message: "The movie was not found" });
      else res.json(data);
    })
    .catch(err => {
      console.log(err);
    });

  /*Movie.find({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });*/
});

/*UPDATE a movie by id*/
router.put("/:id", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
      res.json({
        data: [data]
      });
    })
    .catch(err => {
      console.log(err);
    });
});

/* DELETE a movie by id */

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) next({ message: "The movie was not found" });
      else
        res.json({
          status: 1
        });
    })
    .catch(err => {
      console.log(err);
    });
});

/*GET movies for between two years*/
router.get("/between/:startYear/:endYear", (req, res, next) => {
  const { startYear, endYear } = req.params;

  Movie.find({
    year: {
      $gte: parseInt(startYear),
      $lte: parseInt(endYear)
    }
  })
    .then(data => {
      res.json({
        data: [data]
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

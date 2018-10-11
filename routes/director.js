const express = require('express');
const router = express.Router();

//Director 
const Director = require('../models/Director');


/* GET api/directors page. */
router.get('/', (req, res, next) => {
  Director.find({})
    .then((data) => {
      res.json(data);
      console.log(`DIRECTOR[GET] başarılı`);
    })
    .catch((err) => {
      console.log('DIRECTOR[GET] işleminde hata oluştu');
    });
});

/* POST api/directors page. */
router.post('/', (req, res, next) => {
  const director = new Director(req.body);

  director.save()
    .then((data) => {
      console.log(`DIRECTOR[POST] başarılı`);
      res.json(data);
    })
    .catch((err) => {
      console.log('DIRECTOR[POST] işleminde hata oluştu');
    });
});

/* GET a one director by id */

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Director.findById(id)
    .then((data) => {
      res.json(data);
      console.log('DIRECTOR[GET:id] işlemi başarılı');
    })
    .catch((err) => {
      console.log('DIRECTOR[GET:id] işleminde hata oluştu');
    });
});

/* PUT a one director by id */
router.put('/:id', (req, res, next) => {


  Director.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.json(data);
      console.log('DIRECTOR[PUT:id] işlemi başarılı');
    })
    .catch((err) => {
      console.log('DIRECTOR[PUT:id] işleminde hata oluştu');
    });
});

/* DELETE a one director by id */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Director.findByIdAndRemove(id)
    .then((data) => {
      res.json(data);
      console.log('DIRECTOR[DELETE:id] işlemi başarılı');
    })
    .catch((err) => {
      console.log('DIRECTOR[DELETE:id] işleminde hata oluştu');
    });
});


module.exports = router;

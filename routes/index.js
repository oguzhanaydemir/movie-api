const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

//User Model
const User = require("../models/User");

//JSON Web Token
const jwt = require('jsonwebtoken');

router.get("/", (req, res, next) => {
    console.log(req.app);
    res.render('index');
});

router.post("/register", (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then(hash => {
        const user = new User({
            username,
            password: hash
        });

        const promise = user.save();

        promise
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });
});


router.post("/authenticate", (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.json({
                    status: false,
                    message: 'Authenticate failed, user not found'
                });
            }
            else {
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if (!result) {
                            res.json({
                                status: 0,
                                message: 'Authenticate failed, password is wrong'
                            });
                        }
                        else {
                            const payload = {
                                username
                            };

                            const token = jwt.sign(payload, req.app.get('api_key'), {
                                expiresIn: 720 //12 saat
                            });

                            res.json({
                                status: true,
                                token
                            });
                        }

                    }).catch((err) => {
                        res.json({
                            status: 0,
                            message: 'Authenticate failed, something went to wrong'
                        });
                    })
            }
        })
        .catch((err) => {
            res.json({
                status: 0,
                message: 'Authenticate failed, user not found[MONGODB]'
            });
        });
});
module.exports = router;

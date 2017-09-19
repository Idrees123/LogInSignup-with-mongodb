var Users = require('./../models/usermodel');
var mongoose = require('mongoose');
var helpers = require('./../helpers');
var jwt = require('jsonwebtoken')


exports.signup = function (req, res, next) {

    console.log("signup")
    Users.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})
        .then(function (user) {
            let t_id = mongoose.Types.ObjectId();
            let t_salt = helpers.getSalt()
            let t_token = jwt.sign({
                userid: t_id,
                email: req.body.email
            }, "secretKey", {expiresIn: "2 days"});

            if (user == undefined) {
                let newuser = new Users({

                    username: req.body.username,
                    password: helpers.EncryptPass(req.body.password, t_salt),
                    email: req.body.email,
                    jwt: t_token,
                    salt: t_salt,
                    _id: t_id
                })

                newuser.save()
                    .then(function (newuser) {
                        req.UserDetails = newuser._id
                        console.log("Hi " + newuser.username)

                        res.status(200);
                        res.json(
                            {
                                message: "User  added",
                                token: t_token
                            }
                        )


                    }).catch(function (err) {
                    console.log("err")
                    res.send(err)

                })

            }
            else {
                console.log("User is already added")
                res.status(200);
                res.json(
                    {
                        message: "User is already added"
                    }
                )
            }
        }).catch(function (err) {
        res.send(err)
    })

}


exports.login = function (req, res, next) {
    console.log('login')

    Users.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})
        .then(function (user) {
            if (user != undefined) {


                if (helpers.MatchPass(user.salt, user.password, req.body.password)) {
                    let t_token = jwt.sign({
                        userid: user._id,
                        email: user.email
                    }, "secretKey", {expiresIn: "2 days"})
                    req.UserDetails = user._id;
                    console.log('Hi ' + req.body.username)
                    user.jwt = t_token
                    user.save()
                        .then(function (user) {
                            console.log("updated", user)

                        }).catch(function (err) {
                        res.send(err)

                    })
                    res.status(200)
                    res.json(
                        {
                            message: "Found",
                            token: t_token
                        }
                    )

                }
                else {
                    console.log('Authentication Problem')
                    res.status(200)
                    res.json(
                        {
                            message: "Authentication Problem"
                        }
                    )
                }
            }
            else {
                console.log('Not Found')
                res.status(200);
                res.json(
                    {
                        message: "NotFound"
                    }
                )
            }

        }).catch(function (err) {
        res.send(err)

    });

}




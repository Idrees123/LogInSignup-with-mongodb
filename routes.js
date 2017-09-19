var express = require('express');
var router = express.Router();
var userController = require('./apis/userController');
var goalController = require('./apis/goalController');
var publicRoutes = require('./jwtWhiteSheet')
var jwt = require('jsonwebtoken')

/* Registering All the routes */

router.use(checkToken)
router.post('/login', checkPassword, userController.login);
router.post('/signup', checkPassword, userController.signup)


router.get('/homepage', goalController.viewAllGoals)
router.post('/goals', goalController.addGaol)
router.put('/goals/:goalid', goalController.changeStatus)
router.get('/goals', goalController.myGoals)
function checkToken(req, res, next) {
    if (publicRoutes.includes(req.path)) {
        next()
    }
    else {
        let tokenDetails = req.headers['token-jwt']
        if (tokenDetails) {
            let decoded = jwt.verify(tokenDetails, "secretKey")
            req.UserDetails = decoded;
            console.log(req)
            next();
        }
        else
            res.json({
                message: "Access Forbidden",
                status: 401
            })
    }

}
function checkPassword(req, res, next) {
    console.log("checkPassword")
    if (req.body.password.length > 7) {
        next();
    }
    else {
        console.log("Password is too short")
        res.status(200);
        res.json({
            message: "Password is too short"
        })
    }

}


module.exports = router;




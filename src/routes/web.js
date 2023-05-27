import express from 'express'
import homepageController from '../controllers/homepageController';
const passport = require("passport");
import auth from "../validation/authValidation"
import initPassportLocal from '../controllers/passport/passportLocal';
const authController = require("../controllers/authController")

// init passport-local
initPassportLocal()

// init all web routes
let router = express.Router();

let initAtllWebRoutes = (app)=>{
    router.get('/', homepageController.getHomepage);
    router.get('/register', homepageController.getRegistrationpage);
    router.get("/login", authController.checkLoggedOut, homepageController.getLoginpage)
    router.get("/users", authController.checkLoggedIn, homepageController.getAdminpage)

    router.post('/register', auth.validateRegister, homepageController.registerUser)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }))
    router.get('/log-out', authController.postLogout)

    return app.use('/', router);
}

module.exports = initAtllWebRoutes;
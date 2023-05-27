require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser"
import connectFlash from "connect-flash"
import cookieParser from "cookie-parser";
const session = require("express-session")
const passport = require("passport")
const configSession = require("./config/session")

const app = express();

//config cookie-parser
app.use(cookieParser('secret'));

//show flash messages
app.use(connectFlash());

//config body-parser
app.use(bodyParser.urlencoded({extended: true}));

//config view Engine
configViewEngine(app);

//config app session
configSession(app);

//config passport middelware
app.use(passport.initialize());
app.use(passport.session());

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});
import express from "express";
import { initDb as databaseInit } from "./data/database.js";
import 'dotenv/config';
import cors from 'cors';
import router from "./routes/index.js";
import passport from "passport";
import session from "express-session";
import { Strategy as GitHubStrategy } from 'passport-github';



const app = express();
const port = process.env.PORT || 1313;


app
    .use(express.json())
    .use(cors())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next();
    })
    .use('/', router);


app.get('/', (req, res) => {res.send("Project W5-6. Futher information type api-docs")});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, 
(accessToken, refreshToekn, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


databaseInit((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => {
        console.log(`Database is listening and Node Running i port ${port}`);
        });
    }
});



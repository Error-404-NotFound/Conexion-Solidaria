if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require("express-session");
const cookie = require("express-session/session/cookie");
const User = require('./models/user');// model
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');


mongoose.connect(process.env.MONGODB_SECRET, {});



const sessionConfig = {
    secret: 'hahathisshouldbebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));


app.use(flash());
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', (req, res) => {
    res.send("Please go to /register or /login");
});

app.get('/ha', async (req, res) => {
    const user = new User({ email: "a@dfadf.com" });
    await user.save();
    res.send(user);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // console.log(username + " " + email + " " + password + " ha");
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/login');
        })
    } catch (e) {
        req.flash('error', e.message);
        console.log(e.message);
        res.redirect('register');
    }
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google_callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        // Find the user based on their googleId
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user doesn't exist, create a new one
            user = new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
            await user.save();
        }

        return done(null, user); // Pass the user to Passport
    } catch (err) {
        return done(err, null); // Handle any error
    }
}));




app.get('/register_google', passport.authenticate("google", { scope: ["profile", "email"] }));
app.get('/google_callback', passport.authenticate("google", { failureRedirect: "/register", successRedirect: "/" }));


app.listen(3000, () => {
    console.log("listening on port 3000");
});
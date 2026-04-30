const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const User = require('./Models/User');
const trainRoutes = require('./Routes/train');
const authRoutes = require('./Routes/auth');


mongoose.connect('mongodb+srv://akash:akash@cluster0.xjs4smy.mongodb.net/?appName=Cluster0')
    .then(() => { console.log("DB connected") })
    .catch(err => {
        console.log("DB Connection Error:");
        console.log(err);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'Public')));

app.use(session({
    secret: 'trainsecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/train', trainRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/train');
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});

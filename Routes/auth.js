const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../Models/User');

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/train');
    }
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        let newUser = new User({
            username: req.body.username,
            age: req.body.age,
            ticketNumber: req.body.ticketNumber,
            coaches: req.body.coaches
        });
        let registeredUser = await User.register(newUser, req.body.password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to the Train App, ' + registeredUser.username + '!');
            res.redirect('/train');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/train');
    }
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error', info.message || 'Invalid username or password');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome back!');
            return res.redirect('/train');
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged you out successfully!');
        res.redirect('/login');
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Train = require('../Models/Train');

function isLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

router.get('/', isLoggedIn, async (req, res) => {
    let trains = await Train.find({});
    res.render('trains/index', {trains});
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('trains/new');
});

router.post('/', isLoggedIn, async (req, res) => {
    await Train.create(req.body.train);
    res.redirect('/train');
});

router.get('/:id', isLoggedIn, async (req, res) => {
    let train = await Train.findById(req.params.id);
    res.render('trains/show', {train});
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    let train = await Train.findById(req.params.id);
    res.render('trains/edit', {train});
});

router.put('/:id', isLoggedIn, async (req, res) => {
    await Train.findByIdAndUpdate(req.params.id, {
        time: req.body.train.time,
        seatsLeft: req.body.train.seatsLeft
    });
    res.redirect('/train/' + req.params.id);
});

router.post('/:id/delete', isLoggedIn, async (req, res) => {
    await Train.findByIdAndDelete(req.params.id);
    res.redirect('/train');
});

module.exports = router;

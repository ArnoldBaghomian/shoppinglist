var express = require('express');
var fs = require('fs');
var Item = require('../models/item');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/itemDetails:itemId', function (req, res, next) {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) res.status(400).send(err);
        res.render('showDetail', {
            item: item.item,
            cost: item.cost,
            number: item.number,
            description: item.description
        });
    });
});

router.get('/makeEntry', function (req, res, next) {
    res.render('makeEntry');
});

router.get('/changeEntry:itemId', function (req, res, next) {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) res.status(400).send(err);
        res.render('changeEntry', {
            item: item.item,
            cost: item.cost,
            number: item.number,
            description: item.description,
            id: item._id.toString()
        });
    });
});

module.exports = router;

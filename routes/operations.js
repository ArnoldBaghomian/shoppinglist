'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');

router.delete('/:itemId', function (req, res, next) {
    Item.findById(req.params.itemId, function (err, item) {
        item.remove(function (err) {
            if (!err) console.log('item removed successfully');
            res.status(err ? 400 : 200).send(err || null);
        });
    });
});


router.post('/', function (req, res, next) {
    var item = new Item(req.body);

    item.save(function (err, savedItem) {
        console.log('inside item.save in operations.js. savedItem is:', savedItem);
        res.send(savedItem);
    });
});

router.get('/', function (req, res, next) {
    Item.find({}, function (err, items) {
        res.send(items);
    });
});

router.put('/:itemId', function (req, res, next) {
    var newItem = req.body;
    Item.findById(req.params.itemId, function (err, item) {
        console.log('id is, item is ' + req.params.itemId + ", " + item);
        if (typeof item == 'undefined') {
            alert('undefined item in update');
        }
        else {
            item.item = newItem.item;
            item.cost = newItem.cost;
            item.number = newItem.number;
            item.description = newItem.description;
            item.save(function (err, savedItem) {
                res.status(err ? 400 : 200).send(err || savedItem);
            });
        }
        ;


    });

});


module.exports = router;

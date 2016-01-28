'use strict'

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	item:{type:String, require:true},
	cost:{type:Number, require:true},
	number:{type:Number, require:true},
	description:{type:String, require:true}
});

var Item = mongoose.model('Items', itemSchema);


module.exports = Item; 


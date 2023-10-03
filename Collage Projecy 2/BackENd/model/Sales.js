const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	productID: {
		type: String,
		required: true
	},
	Quantity: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		required: true
	}
});

let collectionName = 'Sale'
module.exports = mongoose.model(collectionName, saleSchema);
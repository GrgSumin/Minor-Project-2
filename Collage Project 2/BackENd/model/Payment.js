const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	orderID: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	Date: {
		type: Date,
		required: true,
	}
});

let collectionName = 'Payment'
module.exports = mongoose.model(collectionName, paymentSchema);

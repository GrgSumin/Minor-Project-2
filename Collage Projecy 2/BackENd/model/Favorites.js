const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String,
		required: true
	}
});

let collectionName = 'Favorite'
module.exports = mongoose.model(collectionName, favoriteSchema);

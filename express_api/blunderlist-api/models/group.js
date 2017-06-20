const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
	// id: UUID,  --- unnecessary
	name: {
		type: String,
		min: [3, 'Name is not long enough.'],
		max: [50, 'Name is too long. '],
		required: [true, "Name is required"]
	}
})

module.exports = mongoose.model('Group', groupSchema);


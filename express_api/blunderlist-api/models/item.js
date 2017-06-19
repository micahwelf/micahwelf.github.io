const mongoose = require('mongoose')
const Schema = mongoose.Schema

const item = new Schema({
	id: UUID,
	name: {
		type: String,
		min: [3, 'Name not long enough.'],
		required: [true, "Name is required."],
		max: [50, 'Name is too long.']
	},
	groupId: Schema.Types.ObjectId,
	completed: Boolean
})

module.exports = item
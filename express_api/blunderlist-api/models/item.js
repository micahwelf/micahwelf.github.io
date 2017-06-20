const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
	//  id: UUID,   -- unnecessary
	name: {
		type: String,
		min: [3, 'Name not long enough.'],
		required: [true, "Name is required."],
		max: [50, 'Name is too long.']
	},
	groupId: {
		type: Schema.Types.ObjectId,
		required: [true, 'An Item needs a group.']
	},
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('item', itemSchema)
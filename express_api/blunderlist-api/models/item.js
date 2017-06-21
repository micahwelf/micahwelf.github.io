const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = require('./group')

const itemSchema = new Schema({
	//  id: UUID,   -- unnecessary
	name: {
		type: String,
		min: [3, 'Name not long enough.'],
		max: [50, 'Name is too long.'],
		required: [true, "Name is required."],
	},
	groupId: {
		// type: Schema.Types.ObjectId,
		type: Schema.Types.ObjectId,
		ref: 'Group',
		// type: Group,
		required: [true, 'An Item needs a group.']
	},
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('item', itemSchema)
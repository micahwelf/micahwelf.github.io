const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
	firstName: String,
	lastName: String,
	phone: String,
	email: String,
	favorites: {
		type: Boolean,
		default: false,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'A Contact needs a User']
	}
})

contactSchema.options.toJSON = {
	getters: true,
	virtuals: true,
	transform: function (doc, ret, options) {
		delete ret._id
		delete ret.__v
		return ret
	}
}

module.exports = mongoose.model('Contact',contactSchema)


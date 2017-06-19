const mongoose = require('mongoose')
const Schema = mongoose.Schema

const group = new Schema({
	id: UUID,
	name: String
})

module.exports = group
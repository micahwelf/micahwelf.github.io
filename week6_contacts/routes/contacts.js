const express = require('express')
const app = express()
const router = express.Router()


const Contact = require('../models/contact')


//Index
app.get('/contacts', (req,res) => {
	Contact.find( (error, contacts) => {
		if (error) { res.json(error) }
		else { res.json(contacts) }
	}) 
	res.json("Contacts Index")
})

//Show
app.get('/contacts/:id', (req,res) => {
	Contact.findById(req.params.id, (error, contact) => {
		if (error) {
			res.json(error)
		} else {
			res.json(contact)
		}
	})
	res.json("Contact Show")
})


//Create
app.post('/contacts/:id', (req,res) => {
	const contact = new Contact(req.body)

	contact.save( (error) => {
		if (error) {
			res.json(error)
		} else {
			res.status(201)
			res.json(contact)
		}
	})
	res.json("Contact Create")
})


//Update
app.put('/contacts/:id', (req,res) => {
	Contact.findByIdAndUpdate(req.params.id, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		favorite: req.body.favorite,
	}, { new: true, runValidators: true }, (error, contact) => {
		if (error) {
			res.json(error)
		} else {
			//res.status(201)
			res.json(contact)
		}
	})
	//res.json("Contact Update")
})


//Destroy
app.get('/contacts/:id', (req,res) => {
	Contact.findByIdAndRemove(req.params.id, (error, contact) => {
		if (error) {
			res.json(error)
		} else {
			//res.status(201)
			res.json(contact)
		}
	})
	//res.json("Contact Destroy")
})


app.listen(3002, function() {
	console.log('Listening on PORT 3002')
})



module.exports = router

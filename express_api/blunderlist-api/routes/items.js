// import { ITEM_CREATE_RES } from './../../../pantry-app/src/actions';

const express = require('express');
const router = express.Router();
const Item = require('../models/item')


// Index
router.get('/items', function (req, res) {
	Item.find(function (error, items) {
		res.json(ITEM_CREATE_RES)
	})
	res.json({
		"Index": [
			"Item #1",
			"Item #2"
		]
	})
})

// Show

router.get('/items/:id', function (req, res) {
	Item.findById(req.params.id, function (error, item) {
		res.json(item)
	})
})
// router.get('/itmes/:id', function (req, res) {
//    res.json({
//       "Items Show": req.params
//    })
// })




// Teachers:
router.post('/items', function (req, res) {
	const item = new Item({
		name: req.body.name,
		group: Group.findById(req.body.group),
		completed: req.body.completed
	})
	item.save()
	res.status(201)
	res.json(item)
})

// Create

// router.post('/items', function (req, res) {
// 	const item = new Item({
// 		name: req.body.name,
// 		groupId: ObjectId(req.body.groupId),
// 		completed: req.body.completed
// 	})

// 	item.save()
// 	res.status(201)
// 	res.json(item)
// 	// res.json({
// 	// 	"Item Create": req.params
// 	// })
// })

// Update     can be PUT or PATCH  method
router.put('/items/:id', function (req, res) {
	Item.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		groupId: ObjectId(req.body.groupId),
		completed: req.body.completed
	}, { new: true, runValidators: true }, function (error, item) {
		{res.json(item)}
	})
	// res.json({
	// 	"Item Update": req.params
	// })
})

// Destroy
router.delete('/items/:id', function (req, res) {
	Item.findByIdAndRemove(req.params.id, function (error, item) {
		res.json(item)
	})
	res.json({
		"Item Delete": req.params
	})
})


//   Next Handling Items











module.exports = router
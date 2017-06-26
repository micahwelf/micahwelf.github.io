const express = require('express')
const router = express.Router();
const Group = require('../models/group')
const Item = require('./../models/item')

// Index   method="GET"

router.get('/groups', function (req, res) {
	res.status(200)
	Group.find(function (err, groups) {
		if (err) {
			res.json(err)
		} else {
			res.json(groups)
		}
	})
})

// Show
router.get('/groups/:id', function (req, res) {
	Group.findById(req.params.id, function (err, group) {
		if (err) {
			if (group == null) {
				res.status(404)
				res.send = ""
			} else {
				res.json(err)
			}
			res.status(404)
			res.json(err)
		} else {
			res.json(group)
		}
	})
})

// Teachers:
router.post('/items', function (req, res) {
	const item = new Item({
		name: req.body.name,
		group: Group.findById(req.body.group),
		completed: req.body.completed
	})
})

router.post('/groups', function (req, res) {
	const group = new Group(req.body)

	group.save(function (err) {
		if (err) {
			res.json(err)
		} else {
			res.status(201)
			res.json('Group Created Successfully.')
		}
	})
})


//  Teacher's Update:

router.put('/groups/:id', function (req, res) {
	Group.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (error, group) {
		if (error) {
			res.json(error)
		} else {
			// res.status(204)
			res.json("Group Updated!")
		}
	})
	// Group.findById(req.body.id, function (error, group) {
	// 	if (error) {
	// 		res.json(error)
	// 	} else {
	// 		if (group == null) {
	// 			res.status(404)
	// 			res.json(error, "databose item Not Found")
	// 		} else {
	// 			group.name = req.body.name
	// 			group.save(function (error) {
	// 				if (error) {
	// 					res.json(error)
	// 				} else {
	// 					res.json("Successfully updated.")
	// 				}
	// 			})
	// 		}
	// 	}
	// })
})



// Update   method="PUT"
router.put('/groups/:id', function (req, res) {
	const newGroup = Group(req.body)

	Group.findById(req.body.id, function (error, group) {
		if (error) {
			res.status(428)
			res.send = "Item ID not found."
		} else {
			group.name = newGroup.name
			group.save(function (error) {
				if (error) {
					res.json(error)
				} else {
					res.status(201)
					res.json('Group Updated Successfully.')
				}
			})
		}
	})
})



// Teacher's Destroy
router.delete('/groups/:id', function (req, res) {
	Group.findByIdAndRemove(req.params.id, function (error, group) {
		if (error) {
			res.json(error)
		} else {
			res.json(group)
		}
	})
	// Group.findById(req.params.id, function (error, group) {
	// 	if (error) {
	// 		res.json(error)
	// 	} else {
	// 		if (!group) {
	// 			res.status(404)
	// 			res.json({ "Error": "ID not found" })

	// 		} else {
	// 			group.remove()
	// 			res.json("Successfully deleted")
	// 		}
	// 	}
	// })
})

// router.get('/groups', function (req, res) {
// 	res.status(200)
// 	res.json({
// 		"Groups": [
// 			[
// 				"Item #1",
// 				"Item #2"
// 			],
// 			[
// 				"Item #100",
// 				"Item #101"
// 			]
// 		]
// 	})
// })

// Show   method="GET"
router.get('/groups/:id', function (req, res) {
	res.status(200)
	res.json({
		"Group Show": [
			"item #100",
			"Item #101"
		]
	})
})

// Create   method="POST"
router.post('/groups', function (req, res) {
	res.status(201);
	res.json({
		"Create Group": []
	})
})

// Update   method="PUT"
router.put('/groups/:id', function (req, res) {
	res.status(204);
	res.json({
		"Group Update": req.params["id"]
	})
})

// Destroy/Delete   method="DELETE"
router.delete('/groups/:id', function (req, res) {
	res.status(204);
	res.json({
		"Group Destroy": req.params["id"]
	})
})


router.get('/groups/:id;/items', function (req, res) {
	Item.find({ groupId: req.params.id }, function (error, items) {
		res.json(items)
	})
})











module.exports = router
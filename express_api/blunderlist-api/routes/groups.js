const express = require('express')
const router = express.Router();


// Index   method="GET"
router.get('/groups', function (req, res) {
	res.status(200)
	res.json({
		"Groups": [
			[
				"Item #1",
				"Item #2"
			],
			[
				"Item #100",
				"Item #101"
			]
		]
	})
})

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
router.delete('/groups/:id', function (req,res){
	res.status(204);
	res.json({
		"Group Destroy": req.params["id"]
	})
})

module.exports = router
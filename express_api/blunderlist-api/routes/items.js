const express = require('express');
const router = express.Router();
const item = require('../models/item')


// Index
router.get('/items', function (req, res) {
   res.json({
      "Index": [
         "Item #1",
         "Item #2"
      ]
   })
})

// Show

// router.get('/itmes/:id', function (req, res) {
//    res.json({
//       "Items Show": req.params
//    })
// })

// Create

router.post('/items', function (req, res) {
   res.json({
      "Item Create": req.params
   })
})

// Update     can be PUT or PATCH  method
router.put('/items/:id', function (req, res) {
   res.json({
      "Item Update": req.params
   })
})

// Destroy
router.delete('/items/:id', function (req, res) {
   res.json({
      "Item Delete": req.params
   })
})

module.exports = router
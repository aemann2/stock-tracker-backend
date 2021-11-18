const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// @router GET quote
// @description Quote stock prices
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		res.status(200).send();
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
});

module.exports = router;

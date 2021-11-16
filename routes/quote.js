const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// @router GET quote
// @description Quote stock prices
// @access Private
router.get('/', auth, async (req, res) => {
	const userId = req.user.id;

	try {
		res.send('Quote');
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
});

module.exports = router;

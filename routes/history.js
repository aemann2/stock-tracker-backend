const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @router GET Quote
// @description Get transaction history
// @access Private
router.get('/', async (req, res) => {
	try {
		const result = await db.any('SELECT * FROM transactions;');
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

module.exports = router;

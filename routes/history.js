const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @router GET Quote
// @description Get transaction history
// @access Private
router.get('/', async (req, res) => {
	try {
		const result = await db.query(
			'SELECT symbol, shares, price, trans_type, transacted FROM transactions WHERE user_id = 1;'
		);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

module.exports = router;

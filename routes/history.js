const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// @router GET Quote
// @description Get transaction history
// @access Private
router.get('/', auth, async (req, res) => {
	const userId = req.user.id;
	try {
		const result = await db.query(
			'SELECT symbol, shares, price, trans_type, transacted FROM transactions WHERE user_id = $1;',
			[userId]
		);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

module.exports = router;

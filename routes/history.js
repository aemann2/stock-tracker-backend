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
		return res.json({ data: result });
	} catch (err) {
		console.error(err);
		return res.json({ error: err });
	}
});

module.exports = router;

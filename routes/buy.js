const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// @router POST buy
// @description Buy stock
// @access Private
router.post('/', auth, async (req, res) => {
	const userId = req.user.id;
	const { symbol, shares, price, trans_type } = req.body;
	try {
		await db.query(
			'INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, $5, now());',
			[userId, symbol, shares, price, trans_type]
		);
		res.status(200).send('Success');
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: err });
	}
});

// @router PUT buy
// @description increase number of stock
// @access private
router.put('/', async (req, res) => {
	try {
	} catch (err) {}
});

module.exports = router;

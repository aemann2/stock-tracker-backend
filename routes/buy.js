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
		db.tx(async (t) => {
			await t.none(
				'INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, $5, now());',
				[userId, symbol, shares, price, trans_type]
			);
			await t.none(
				'INSERT INTO portfolios (user_id, symbol, shares) VALUES ($1, $2, $3);',
				[userId, symbol, shares]
			);
		});
		return res.status(200).json({ msg: 'Success' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
});

// @router PUT buy
// @description increase number of stock
// @access private
router.put('/', auth, async (req, res) => {
	const userId = req.user.id;
	const { symbol, shares, price, trans_type } = req.body;
	try {
		db.tx(async (t) => {
			await t.none(
				'INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, $5, now());',
				[userId, symbol, shares, price, trans_type]
			);
			await t.none(
				'UPDATE portfolios SET shares = shares + $1 WHERE symbol = $2 AND user_id = $3;',
				[shares, symbol, userId]
			);
		});
		return res.status(200).json({ msg: 'Success' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err });
	}
});

module.exports = router;

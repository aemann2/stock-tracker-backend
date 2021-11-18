const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// @router PUT sell
// @description Sell stock
// @access Private
router.put('/', auth, async (req, res) => {
	const userId = req.user.id;
	const { symbol, shares, price } = req.body;

	db.tx('sell', async (t) => {
		await t.none(
			"INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, 'SELL', now());",
			[userId, symbol, shares, price]
		);

		return t.none(
			'UPDATE portfolios SET shares = shares - $1 WHERE symbol = $2 AND user_id = $3;',
			[shares, symbol, userId]
		);
	})
		.then(() => {
			return res.status(200).json({ msg: 'Success' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err });
		});
});

// @router DELETE sell
// @description Remove stock from portfolio
// @access Private
router.delete('/', auth, async (req, res) => {
	const userId = req.user.id;
	const { symbol, shares, price } = req.body;

	db.tx('sell', async (t) => {
		await t.none(
			"INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, 'SELL', now());",
			[userId, symbol, shares, price]
		);

		return t.none(
			'DELETE FROM portfolios WHERE user_id = $1 AND symbol = $2;',
			[userId, symbol]
		);
	})
		.then(() => {
			return res.status(200).json({ msg: 'Success' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err });
		});
});

module.exports = router;

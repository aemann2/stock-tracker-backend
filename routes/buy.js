const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @router POST buy
// @description Buy stock
// @access Private
router.post('/', async (req, res) => {
	const { user_id, symbol, shares, price, trans_type } = req.body;
	try {
		await db.query(
			'INSERT INTO transactions (user_id, symbol, shares, price, trans_type, transacted) VALUES ($1, $2, $3, $4, $5, now());',
			[user_id, symbol, shares, price, trans_type]
		);
		res.status(200).send('Success');
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
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

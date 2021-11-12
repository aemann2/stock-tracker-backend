const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// @router POST sell
// @description Sell stock
// @access Private
router.post('/', async (req, res) => {
	try {
	} catch (err) {}
});

// @router PUT sell
// @description Decrease number of stock
// @access Private
router.put('/', async (req, res) => {
	const userId = req.user.id;
	try {
	} catch (err) {}
});

// @router DELETE sell
// @description Remove stock from portfolio
// @access Private
router.delete('/', async (req, res) => {
	const userId = req.user.id;
	try {
	} catch (err) {}
});

module.exports = router;

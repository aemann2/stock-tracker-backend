const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// @router POST /auth
// @description Register a user
// @access Public
router.post(
	'/',
	body('email').isEmail().withMessage('Must be a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),

	async (req, res) => {
		// checking for errors through express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { email, password } = req.body;

			const user = await db.oneOrNone(`SELECT * FROM users WHERE email = $1`, [
				email,
			]);
			// if user exists, send a 400
			if (user) {
				return res
					.status(400)
					.json({ error: 'A user with this email already exists' });
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const userid = await db.query(
				`INSERT INTO users (email, hash) VALUES($1, $2) RETURNING id`,
				[email, hash]
			);

			const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
				expiresIn: 3600,
			});

			return res.status(201).json({ status: 'Account created', token });
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	}
);

module.exports = router;

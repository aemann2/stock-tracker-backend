const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// @router POST /auth
// @description Log a user in
// @access Public
router.post(
	'/',
	body('email').isEmail().withMessage('Must be a valid email'),

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
			// if user is not in the DB, send a 403
			if (!user) {
				return res.status(403).json({ error: 'That user does not exist' });
			}

			const { hash } = user;

			const hashCheck = await bcrypt.compare(password, hash);

			if (!hashCheck) {
				return res.status(403).json({ error: 'Incorrect password' });
			}

			res.send('Successfully logged in!');
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	}
);

module.exports = router;

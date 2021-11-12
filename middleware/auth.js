const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.header('x-auth-token');
	// if no token exists, return error
	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}
	try {
		// decoding the header w/ jwt
		const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
		// setting the user to the user we decoded from the token
		req.user = decodedUser;
	} catch (err) {
		return res.status(401).json({ msg: 'Invalid token' });
	}
	// next function moves on to the next piece of middleware
	return next();
};

module.exports = verifyToken;

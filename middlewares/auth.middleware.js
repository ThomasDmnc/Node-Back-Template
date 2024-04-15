const jwt = require('jsonwebtoken');

const verifyToken = (request, res, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        request.payload = payload; 
        next()
    } catch (error) {
        res.status(401).json({message: 'Token is not provided or invalid'})
    }
};

module.exports = {
    verifyToken
};
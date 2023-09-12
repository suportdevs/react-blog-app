const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        //   get the token from the authorization header
        const token = await req.headers.authorization?.split(" ")[1];
        if (!token) {
            return next('Token is missing. You are not authorized!');
        }
        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return next('Invalid token. You are not authorized!');
        }
         // Assuming `decodedToken` contains user information, you can assign it to `req.user`
         req.user = decodedToken;

         // Continue processing the request
         next();
    }catch(error) {
        // Handle other errors
        next(err);
    }
}
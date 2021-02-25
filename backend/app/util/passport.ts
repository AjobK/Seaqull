const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
require('dotenv').config();

module.exports = (res) => {
    const cookieExtractor = (req) => {

        const { token } = req.cookies;
        return token;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, done) => {
        const { expiration } = jwtPayload;
        if (Date.now() > expiration) {
            return res.status(422).send('Token invalid');
        }
        done(null, jwtPayload);
    }));
};

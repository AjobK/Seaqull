const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
require('dotenv').config();

module.exports = () => {
    const cookieExtractor = req => {
        let jwt = null;
        if (req && req.cookies) {
            jwt = req.cookies['jwt'];
        }
        return jwt;
    };

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, done) => {
        const { expiration } = jwtPayload;

        if (Date.now() > expiration) {
            done('Unauthorized', false);
        }

        done(null, jwtPayload);
    }));
};

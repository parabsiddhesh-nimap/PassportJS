const {User} = require('./dbconfig');
const LocalStrategy = require('passport-local').Strategy;

function intializingPassport(passport) {
    passport.use(new LocalStrategy(
        function (email,password,done) {
        try{
            const user = User.findOne({ email: email });
            console.log('---------',user);            
            if(!user) return done(null,false);
            if(!user.verifyPassword(password)) return done(null,false);
            return done(null,user);
        }catch(err){
            return done(err,false);
        }
    }));

    passport.serializeUser((user, done) => {
            done(null, user.id);
        });

    passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });
}

module.exports = intializingPassport;
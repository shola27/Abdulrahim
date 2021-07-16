const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
const { User } = require('../models'); 

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'myVerySecret'

module.exports = passport =>{
    passport.use('jwt.users',new JwtStrategy(
        jwtOptions,(jwt_payload, done)=>{
            User.findOne({where:{id:jwt_payload.id}}).then(user =>{
                console.log(user);
                console.log(jwt_payload);
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err =>{
                console.log(err);
            });
        }
    ));

    // passport.use('jwt.forget',new JwtStrategy(
    //     jwtOptions,(jwt_payload, done)=>{
    //         Forget.findOne({where:{email:jwt_payload.email}}).then(forget =>{
    //             console.log(forget);
    //             console.log(jwt_payload);
    //             if(forget){
    //                 return done(null, forget);
    //             }
    //             return done(null, false);
    //         }).catch(err =>{
    //             console.log(err);
    //         });
    //     }
    // ));
}
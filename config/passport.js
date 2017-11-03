// var jwtStrategy  = require('password-jwt').Strategy;
// var config = require('./config/config');
//
// module.exports = function(passport){
//   var passp = {};
//   passp.secretKey = config.secret;
//   passport.use(new jwtStrategy(passp,function(jwt,done){
//     User.find({_id:jwt.id},function(err,user){
//       if(err){
//         return done(err , false);
//       }
//       if(user){
//         done(null,user);
//       }
//       else{
//         done(null,false);
//       }
//     });
//   }));
// };

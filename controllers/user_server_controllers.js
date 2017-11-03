var dbConnection = require('../config/db/connection');
var commonFunc = require('../utils/commonfunction');
var async = require('async');
var fs = require("fs");
var md5 = require('MD5');

exports.userRegistration = function(req,res){
  console.log("Here is req..",req.body);
  var userName = req.body.name;
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  var checkValues = [userName,userEmail,userPassword];
  async.waterfall([
    function(callback){
      commonFunc.checkBlank(checkValues, callback);
    },function(callback){
      commonFunc.checkEmailAvailability(res, userEmail,callback);
    }],function(resultCallback){
      var currentTime = new Date().getTime().toString();
      //req.files.user_image=currentTime;
      var UserImage = "https://res.cloudinary.com/duvhz1xyw/image/upload/c_thumb,w_315,h_209,c_fill,g_auto,q_auto/andoc1cv3srsdikgbbku.png";
      // commonFunc.imageUploadOnServer(UserImage,'UserImage',function(imgLink){
      //   if(imgLink ===0){
      //     console.log("error");
      //     res.status(400).Json({msg:"Image Not Found!"});
      //     return;
      //   }
      //   else {
        // var UserImage = imgLink;
            var loginTime = new Date();
            var accessToken = md5(userEmail+userPassword+loginTime);
            var encryptPassword = md5(userPassword);
            var sql = "INSERT INTO `nilkanta`(`name`,`email`,`password`,`profile_img`,`access_token`,`created_at`) VALUES(?,?,?,?,?,?)";
            var values = [userName,userEmail,encryptPassword,UserImage,accessToken,loginTime];
            dbConnection.Query(res,sql,values,function(userInsertResult){
              var sqlGetUser = "SELECT `name`,`email`,`access_token` FROM `nilkanta` WHERE `email`=? LIMIT 1"
              dbConnection.Query(res,sqlGetUser,[0,userEmail],function(userInfo){
                var id = userInfo[0].id;
                var final = {
                                "access_token": userInfo[0].access_token,
                                "user_name": userInfo[0].name,
                                "user_image": userInfo[0].image,
                                "email": userInfo[0].email
                                };
                res.status(200).json({msg:"Wellcome to DharmaLab!",userInfo:final});
                return;
              });
            });
        //  }
      //  })
    });
};

 exports.readUser = function(req,res){
   var id = req.query.id;
   dbConnection.Query(
     res,
     id ? 'select * from nilkanta where id=' + id.toString() : 'select * from nilkanta',
     function(error, result){
       if(error){
         res.status(400).json({message: error.message || 'User not found'});
         return;
       }
       res.send(result).status(200);
       return;
     }
   )
 }


 exports.deleteUser = function(req,res){
   var id = req.body.id;
   if(!id){
     res.json({message: 'Id not provided'}).status(400);
     return;
   }
   dbConnection.Query(
     res,
     'delete from nilkanta where id=' + id.toString(),
     function(error, result){
       if(error){
         res.status(400).json({message: error.message || 'User not found'});
         return;
       }
       res.send({message: 'User successfully deleted.', result: result}).status(200);
       return;
     }
   )
 }

 exports.updateUser = function(req,res){
   if(!req.body.id){
     res.json({message: 'Id not provided'}).status(400);
     return;
   }
   dbConnection.Query(
     res,
     'update nilkanta set id=?,email=?,name=?' + ' where id=' + req.body.id.toString(),
     [req.body.id, req.body.email, req.body.name],
     function(error, result){
       if(error){
         res.status(400).json({message: error.message || 'User not found'});
         return;
       }
       res.send({message: 'User successfully deleted.', result: result}).status(200);
       return;
     }
   )
 }

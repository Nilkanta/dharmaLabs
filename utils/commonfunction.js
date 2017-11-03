exports.checkBlank = function(values, callback){
  var checkBlankData = check(values);
  if (checkBlankData==1) {
    var error = new Error("parameter missing!");
    callback(error);
  }
  else {
    callback(values);
  }
};

//check passing parameter is blank or not
function check(arr) {
    var arrLength = arr.length;
    for (var i = 0; i < arrLength; i++) {
        if ((arr[i] == '')||(arr[i] == undefined)||(arr[i] == '(null)')) {
            return 1;
            break;
        }
    }
    return 0;
};

exports.checkNull=function(value){
    var checkBlankData = check([value]);
    if (checkBlankData) {
        return '';
    }
    else {
        return value;
    }
}

exports.checkEmailAvailability=function(res,email,callback){
    var sql = "SELECT `user_id`,`access_token`,`password` FROM `nilkanta` WHERE `email`=? limit 1";
    var values = [0,email];

    dbConnection.Query(res, sql, values, function (userResponse) {

        if (userResponse.length) {
          callback(res);
            // sendResponse.sendErrorMessage(constant.responseMessage.EMAIL_EXISTS, res);
        }
        else {
            callback();
        }
    });
}

//image upload
exports.imageUploadOnServer=function(img,folder,callback){

    var filename = img.name; // actual filename of file
    var path = img.path;
    var mimeType = img.type;

    fs.readFile(path, function (err, file_buffer) {
        if(err){
            return callback(0);
        }
        else{
            var newPath = "/var/www/html/SportsMatch/"+folder +"/"+ filename;
            var storePath = "/SportsMatch/"+folder +"/"+ filename;
            fs.writeFile(newPath, file_buffer, function (err,result) {
                if (err){
                    console.log(err);
                    return callback(0);
                }
                else
                {
                    return callback(constant.serverInfo.BASE_URL+storePath);
                }
            });
        }

    });
};

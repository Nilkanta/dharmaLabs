var express = require('express');
var router = express.Router();
var user_auth = require('../controllers/user_server_controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.route('/signup').post(user_auth.userRegistration);
router.route('/read').get(user_auth.readUser);
router.route('/delete').post(user_auth.deleteUser);
router.route('/update').post(user_auth.updateUser);
module.exports = router;

var mysql    = require('mysql');
var config   = require('../config');
var dbConfig = config.databaseSettings;

var pool = mysql.createPool(dbConfig);
exports.Query = function (res, query, values, callback) {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log(err);
            res.send("Error in DB Connection");
            return;
        }
        else {

            connection.query(query, values, function (err, rows) {
                // And done with the connection.
                console.log(query);
                connection.release();
                if (err) {
                    console.log(err);
                    res.send("Error In query");
                    return;
                }
                else {
                  console.log("Connected with Database!");
                  return callback(rows);
                }
            });
        }
        // connected! (unless `err` is set)
    });
};

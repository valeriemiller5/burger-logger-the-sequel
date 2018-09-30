// Require in MySQL connection
var connection = require("../config/connection.js");

// Generates question mark for values as needed for MySQL query
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Converts key/object values to MySQL syntax
function objToSql(obj) {
  var arr = [];

   for (var key in obj) {
    var value = obj[key];
    
    if (Object.hasOwnProperty.call(obj, key)) {
      // if string with spaces then surround the string with quotations ''
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  };

  return arr.toString();
};

//ORM methods that will be needed: selectAll(), insertOne(), updateOne()
var orm = {
  // Read function:
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // Create function:
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // Update function:
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
  // Delete function: isn't part of this project
};

// Export orm.js to the burger.js model
module.exports = orm;
const mysql = require("mysql");
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "99_and_diner",
});

database.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = database;

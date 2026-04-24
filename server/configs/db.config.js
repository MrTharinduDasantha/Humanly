import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "humanly",
});

connection.connect(function (error) {
  if (error) console.log("Error connecting mysql database");
  else console.log("Mysql database connected successfully");
});

export default connection;

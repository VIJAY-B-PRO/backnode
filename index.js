const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "node",
});
connection.connect();

const corsoption = {
  origin: ["http://localhost:4200"],
};

app.use(cors(corsoption));

app.use(express.static("public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/getdetails", (req, res) => {
  connection.query(
    "SELECT * FROM node.nodetoang",
    function (err, rows, result, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
      //  console.log(JSON.stringify(rows));
    }
  );
});
app.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);

  connection.query(
    `DELETE FROM node.nodetoang WHERE id ='${req.params.id}'`,
    function (err, rows, result, fields) {
      if (err) throw err;
    }
  );
});

app.post("/login", (req, res) => {
  connection.query(
    `SELECT * FROM node.nodetoang WHERE Email='${req.body.Email}' and Password='${req.body.Password}'`,
    function (err, result, rows, fields) {
      if (err) throw err;
      res.send({ value: result[0].usertype, status: "success" });
    }
  );
});

app.post("/add", (req, res, next) => {
  console.log(req.body);

  connection.query(
    "INSERT INTO node.nodetoang (userName,Password,Email,usertype) VALUES(?,?,?,?)",
    [req.body.userName, req.body.Password, req.body.Email, req.body.usertype],
    function (err, result) {
      if (err) {
        throw err;
      }
      res.send({ status: "1 record inserted" });
    }
  );
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

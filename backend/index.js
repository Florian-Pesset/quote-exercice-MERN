const express = require('express');
const connection = require("./db.config");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = 3001;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to my quotes list");
});


app.get("/quote", (req, res) => {
  connection.query("SELECT * FROM quote", (err, results) => {
    if(err) {
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
})});

app.post("/quote", (req, res) => {
  const { firstname, lastname, description } = req.body;
  connection.query(
    "INSERT INTO quote(firstname, lastname, description) VALUES(?, ?, ?)",
    [firstname, lastname, description],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a quote");
      } else {
        console.log(results);
        res.status(200).send("Successfully saved");
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Server is runing on 3001`);
});

module.exports = app;
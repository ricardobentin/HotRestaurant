// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Reservations and waitlist (DATA)
// =============================================================
let reservations = [
  {
    name: "Ricardo Bentin",
    phone: "5128675309",
    email: "rb@gmail.com",
    uniqueID: "abc123"
  },
  {
    name: "Jenna Bentin",
    phone: "5555555555",
    email: "jb@gmail.com",
    uniqueID: "def567"
  }
];

let waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// get all tables - provides JSON
app.get("/api/tables", function(req, res) {
  for (var i = 0; i < reservations.length; i++) {
    res.json(reservations);
  }
});

// get all ppl on waitlist - provides JSON
app.get("/api/waitlist", function(req, res) {
  console.log(waitList.length);
  if (waitList.length === 0) {
    res.send("No waitlist. Book your table now!");
  } else {
    for (var i = 0; i < waitList.length; i++) {
      res.json(waitList);
    }
  }
});

// Create New reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  console.log(newReservation);
  reservations.push(newReservation);
  res.json(newReservation);
});

app.post("/api/clear", function(req, res) {
  reservations = [];
  res.json(reservations);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

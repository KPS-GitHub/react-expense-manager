var express = require("express");
var router = require("./routes/routes.js");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static(path.join(__dirname, "../client")));

}

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: false}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/expenseManagerDb");

app.use("/", router);

module.exports = app;
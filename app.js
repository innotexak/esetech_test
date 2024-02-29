require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require('mongoose');
const path =require('path')
const cors = require('cors')

var indexRouter = require("./routes/index");

var app = express();


app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const uri = process.env.MONGO_URL

console.log(uri)
// Connect db 
const db = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1:27017/esetech", { useNewUrlParser: true, useUnifiedTopology: true });

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open', function() {
  console.log('Connected to MongoDB');
})

app.use("/api", indexRouter);
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error view
  res.status(err.status || 500);
  res.render("error");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 8000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;

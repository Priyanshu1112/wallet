var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
require("./models/database").connectDatabase();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://stock-whisperer.onrender.com"],
    credentials: true,
    maxAge: 1800,
    methods: "POST, GET, OPTIONS, DELETE, PUT",
    allowedHeaders: ["content-type"],
    optionsSuccessStatus: 200,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//session and cookie
const session = require("express-session");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

const indexRouter = require("./routes/indexRoutes");
const adminRouter = require("./routes/adminRoutes");
const usersRouter = require("./routes/usersRoutes");

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler

// error handler
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
app.use((req, res, next) => {
  next(new ErrorHandler(`Request URL Not Found: ${req.url}`), 404);
});
app.use(generatedErrors);

module.exports = app;

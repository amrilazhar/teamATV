require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// Express
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
); // support encoded bodies

//set fileUpload plugins
app.use(fileUpload());
//set static assets to public directory
app.use(express.static("public"));

// ROUTES DECLARATION & IMPORT
const authRoutes = require("./routes/authRoute.js");
app.use("/auth", authRoutes);

const movieRoutes = require("./routes/movieRoute.js");
app.use("/movie", movieRoutes);

const reviewRoutes = require("./routes/reviewRoute.js");
app.use("/review", reviewRoutes);

const userRoutes = require("./routes/userRoute.js");
app.use("/user", userRoutes);

const personRoutes = require("./routes/personRoute.js");
app.use("/user", personRoutes);

//======================== security code ==============================//
// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
app.use(cors());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}
//======================== end security code ==============================//


if (process.env.NODE_ENV !== "test") {
  let PORT = 3000;
  app.listen(PORT, () =>
    console.log("server running on PORT :", PORT)
  );
} else module.exports = app;

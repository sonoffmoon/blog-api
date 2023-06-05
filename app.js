const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const routes = require("./routes/routes");
const errorMiddleware = require("./middlewares/errorMiddlewares");

mongoose
  .connect(process.env.DB.replace("<DB_PASS>", process.env.DB_PASS), {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    console.log("DB connected");
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      })
    );
    app.use(helmet());
    app.use(mongoSanitize());
    app.use(xss());
    app.use(errorMiddleware);
    app.use("/api", routes);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`app running on port ${process.env.PORT}`);
    });
  });

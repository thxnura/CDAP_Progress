const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT, (err) => {
  if (err) {
    console.log("mongo connection error ", err);
  } else {
    console.log("Mongodb connection success");
  }
});

const customerRoutes = require("./src/Routes/customer.routes");
app.use("/api/customer", customerRoutes);

const movieAdminRoutes = require("./src/Routes/movieAdmin.routes");
app.use("/api/movieadmin", movieAdminRoutes);

const loginRoute = require("./src/Routes/login.routes");
app.use("/api/login", loginRoute);

const movieRoute = require("./src/Routes/movie.routes");
app.use("/api/movie", movieRoute);

const bookingRoute = require("./src/Routes/booking.routes");
app.use("/api/booking", bookingRoute);

app.listen(4000, (err) => {
  if (!err) {
    console.log("successfully connected to the port ", 4000);
  } else {
    console.log("error occured ", err);
  }
});

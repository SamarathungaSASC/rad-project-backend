require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");

const { PORT, MONGO_URI } = require("./src/configs/server");
const authMiddleware = require("./src/middleware/auth.middleware");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect MongoDB
mongoose.connect(MONGO_URI).catch((error) => console.log(error));

//Routes
app.use("/v1/auth", authRoutes);
app.use("/v1/user", authMiddleware, userRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

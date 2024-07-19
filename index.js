require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.route");

const { PORT } = require("./src/configs/server");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

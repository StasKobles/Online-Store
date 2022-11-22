require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlerMiddleware");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//Error treatment, last middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

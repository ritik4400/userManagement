const express = require("express");
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const swaggerDocs = require("./middleware/swagger");
const {logger , httpLogger} = require('./config/logger')
const { AppError, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON
app.use(errorHandler);
//Loger middleware
// const logger = (req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// };
// app.use(logger);
swaggerDocs(app);
app.use(httpLogger);

const routes = require("./routes/userRoutes");
app.use("/api/v1/user", routes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/product", productRoutes);

// app.get("/", function (req, res) {
//   logger.info("Home route accessed");
//   res.send("Swagger API Docs Example");
//   // res.status(200).send('Hello World')
// });

app.get("/", (req, res) => {
  logger.error("Something went wrong!", { errorCode: 500 });
  res.status(500).send("Internal Server Error");
});

const uploadRoutes = require('./routes/uploadRoutes');
app.use("/upload", uploadRoutes)

// Global Error-Handling Middleware
// app.use((err , req , res , next)=>{
//     console.error(err.message);
//     res.status(err.status || 500).json({error:err.message})
// })
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected....."))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoute = require("./routes/product");
const userRoutes = require("./routes/user");
require("dotenv").config();

const server = express();
server.use(express.json());
server.use(cors());

server.use("/products", ProductRoute);
app.use("/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

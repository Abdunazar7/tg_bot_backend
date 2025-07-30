const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const ProductRoute = require("./routes/product");

mongoose.connect("mongodb+srv://abdunazaribragimov945:wM1n61rl6ifN6XJo@cluster0.uhd1oze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

const server = express();
server.use(express.json());
server.use(cors())

server.use("/products", ProductRoute);


server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
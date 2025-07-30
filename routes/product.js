const express = require("express");
const {
  Product,
  productValidator,
  productUpdateValidator,
} = require("./../models/product");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

route.get("/search/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const product = await Product.findOne({ name: new RegExp(name, "i") });

    if (!product) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Incorrect name!" });
    }
    res.status(400).send({ message: err.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const { value, error } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product = new Product(value);
    await product.save();
    res.status(201).send({ message: "New product created", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

route.patch("/:id", async (req, res) => {
  try {
    const { value, error } = productUpdateValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).send({ message: "Product Updated", product });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Incorrect ID!" });
    }
    res.status(400).json({ message: err.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Not found!" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = route;
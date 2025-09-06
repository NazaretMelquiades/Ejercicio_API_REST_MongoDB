const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controllers")

// GET
router.get("/", productController.getAllProducts);

// POST
router.post("/", productController.createProduct);

// PUT
router.put("/", productController.updateProduct);

// DELETE
router.delete("/", productController.deleteProduct);

module.exports = router;
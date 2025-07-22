const express = require("express");
const router = express.Router();
const {
    getProductsController,
    createProductController,
    updateProductController,
    deleteProductController
} = require("../controllers/products.controllers")

// GET
router.get("/", getProductsController);

// POST
router.post("/", createProductController);

// PUT
router.put("/", updateProductController);

// DELETE
router.delete("/", deleteProductController);

module.exports = router;
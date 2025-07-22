const express = require("express");
const router = express.Router();
const providersController = require("../controllers/providers.controller");

// GET
router.get("/", providersController.getProviders);

// POST
router.post("/", providersController.createProvider);

//PUT
router.put("/", providersController.updateProvider);

//DELETE
router.delete("/", providersController.deleteProvider);

module.exports = router;
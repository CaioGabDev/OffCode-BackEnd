const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/report/csv", reportController.exportClientesCSV);

module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const reports = require("../controllers/reports");

router.route("/reports").get(reports.getReports);
router.route("/report").get(reports.getReport).post(reports.createReport);
router.route("/report/:id").get(reports.getReport).put(reports.updateReport).delete(reports.deleteReport);
router.route("/report/:id/complete").put(reports.markReport);

module.exports = router;
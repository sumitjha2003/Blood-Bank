const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/create-inventory", authMiddelware, createInventoryController);

router.get("/get-inventory", authMiddelware, getInventoryController);

router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);


router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

router.get("/get-donars", authMiddelware, getDonarsController);

router.get("/get-hospitals", authMiddelware, getHospitalController);

router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

module.exports = router;

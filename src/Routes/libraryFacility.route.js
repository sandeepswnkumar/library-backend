import express from "express";
import {
  getAllLibraryFacilities,
  getLibraryFacilityById,
  updateLibraryFacilityById,
  deleteLibraryFacilityById,
} from "../Controllers/libraryFacility.controller.js";

const router = express.Router();

router.get("/", getAllLibraryFacilities);
router.get("/:id", getLibraryFacilityById);
router.put("/:id", updateLibraryFacilityById);
router.delete("/:id", deleteLibraryFacilityById);

export default router;

import express from "express";
import {
  getAllLibraryLocations,
  getLibraryLocationById,
  updateLibraryLocationById,
  deleteLibraryLocationById
} from "../Controllers/libraryLocation.controller.js";

const router = express.Router();

router.get("/", getAllLibraryLocations);
router.get("/:id", getLibraryLocationById);
router.put("/:id", updateLibraryLocationById);
router.delete("/:id", deleteLibraryLocationById);

export default router;

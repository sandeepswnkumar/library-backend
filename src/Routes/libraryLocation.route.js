import express from "express";
import {
  create,
  getAllLibraryLocations,
  getLibraryLocationById,
  updateLibraryLocationById,
  deleteLibraryLocationById
} from "../Controllers/libraryLocation.controller.js";
import CreateLibraryLocationRequest from "../Requests/CreateLibraryLocationRequest.js";

const router = express.Router();

router.post("/", CreateLibraryLocationRequest, create);
router.get("/", getAllLibraryLocations);
router.get("/:id", getLibraryLocationById);
router.put("/:id", updateLibraryLocationById);
router.delete("/:id", deleteLibraryLocationById);

export default router;

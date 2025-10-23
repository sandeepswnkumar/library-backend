import express from "express";
import {
  getAllLibraryFacilities,
  getLibraryFacilityById,
  updateLibraryFacilityById,
  deleteLibraryFacilityById,
  create,
} from "../Controllers/libraryFacility.controller.js";
import CreateLibraryFacilityRequest from "../Requests/CreateLibraryFacilityRequest.js";

const router = express.Router();

router.post("/", CreateLibraryFacilityRequest, create);
router.get("/", getAllLibraryFacilities);
router.get("/:id", getLibraryFacilityById);
router.put("/:id", updateLibraryFacilityById);
router.delete("/:id", deleteLibraryFacilityById);

export default router;

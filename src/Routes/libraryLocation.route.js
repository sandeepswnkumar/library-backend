import express from "express";
import {
  create,
  getAllLibraryLocations,
  getLibraryLocationById,
  updateLibraryLocationById,
  deleteLibraryLocationById,
  addLibraryRoomType,
  getLibraryRoomType
} from "../Controllers/libraryLocation.controller.js";
import CreateLibraryLocationRequest from "../Requests/CreateLibraryLocationRequest.js";

const router = express.Router();

router.post("/room-type", addLibraryRoomType);
router.get("/room-type", getLibraryRoomType);
router.post("/", CreateLibraryLocationRequest, create);
router.get("/", getAllLibraryLocations);
router.get("/:id", getLibraryLocationById);
router.put("/:id", updateLibraryLocationById);
router.delete("/:id", deleteLibraryLocationById);

export default router;

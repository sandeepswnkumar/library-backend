import express from "express";
import {
  create,
  getAllLibraryLocations,
  getLibraryLocationById,
  updateLibraryLocationById,
  deleteLibraryLocationById,
  addLibraryRoomType,
  getLibraryRoomType,
  deleteLbRoomType,
  addLibraryBookingUnit,
  getLibraryBookingUnit,
  deleteLbBookingUnit
} from "../Controllers/libraryLocation.controller.js";
import CreateLibraryLocationRequest from "../Requests/CreateLibraryLocationRequest.js";

const router = express.Router();

router.post("/room-type", addLibraryRoomType);
router.get("/room-type", getLibraryRoomType);
router.delete("/room-type/:id", deleteLbRoomType);
router.post("/booking-unit", addLibraryBookingUnit);
router.get("/booking-unit", getLibraryBookingUnit);
router.delete("/booking-unit/:id", deleteLbBookingUnit);
router.post("/", CreateLibraryLocationRequest, create);
router.get("/", getAllLibraryLocations);
router.get("/:id", getLibraryLocationById);
router.put("/:id", updateLibraryLocationById);
router.delete("/:id", deleteLibraryLocationById);

export default router;

import { Router } from "express";
import CreateBookingRequest from "../Requests/BookingCreateRequest.js";
import {
    create,
    getAllBookings,
    getBookingById,
    deleteBookingById,
    updateBookingById,
} from "../Controllers/booking.controller.js";

const router = Router();


router.route('/')
    .post(CreateBookingRequest, create)   // Create Booking
    .get(getAllBookings);                 // Get All Bookings

router.route('/:id')
    .get(getBookingById)                   // Get Booking by ID
    .delete(deleteBookingById)             // Delete Booking
    .put(updateBookingById);               // Update Booking


export default router;

import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { getOffset } from "../Utils/helper.js";
import {
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    getBookings,
    bookingExists,
} from "../Services/booking.service.js";
import { validationResult } from "express-validator";


// ➤ Create Booking
export async function create(req, res) {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty())
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));

        const booking = await createBooking(req.body, Number(req.user.id));

        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, "Booking Created Successfully", booking));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}


// ➤ Get All Bookings
export async function getAllBookings(req, res) {
    try {
        const { limit = 10, page, userId, statusId } = req.query;

        const skip = getOffset(limit, page);
        let pagination = { take: parseInt(limit), skip };

        let conditions = {};

        if (userId) conditions.userId = parseInt(userId);
        if (statusId) conditions.statusId = parseInt(statusId);

        const bookings = await getBookings({ conditions, pagination });

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Bookings Fetched Successfully", bookings));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}


// ➤ Get Booking by Id
export async function getBookingById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Booking id is required");

        const booking = await getBooking(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Booking Fetched Successfully", booking));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}


// ➤ Delete Booking by Id (soft delete)
export async function deleteBookingById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Booking id is required");

        const booking = await deleteBooking(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Booking Deleted Successfully", booking));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}


// ➤ Update Booking by Id
export async function updateBookingById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Booking id is required");

        if (Object.keys(req.body).length === 0)
            throw new Error("Data is required");

        await updateBooking(parseInt(id), req.body);

        const booking = await getBooking(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Booking Updated Successfully", booking));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

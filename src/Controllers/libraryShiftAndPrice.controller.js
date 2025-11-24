import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { validationResult } from "express-validator";
import { getOffset } from "../Utils/helper.js";

import {
    createShiftAndPrice,
    deleteShiftAndPrice,
    updateShiftAndPrice,
    getShiftAndPriceById,
    getShiftAndPrices,
    shiftAndPriceExists
} from "../Services/libraryShiftAndPrice.service.js";

export async function create(req, res) {
    try {

        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));
        }

        const {
            libraryId,
            libraryLocationId,
            libraryRoomTypeId,
            libraryBookingUnitId,
            period
        } = req.body;

        const exists = await shiftAndPriceExists({
            libraryId,
            libraryLocationId,
            libraryRoomTypeId,
            libraryBookingUnitId,
            period
        });

        if (exists) throw new Error("Shift & Price Record Already Exists");

        const data = await createShiftAndPrice(req.body);

        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, "Shift & Price Created Successfully", data));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

export async function getAll(req, res) {
    try {
        const { limit = 10, page } = req.query;
        const skip = getOffset(limit, page);

        let pagination = { take: parseInt(limit), skip };

        let conditions = {};
        if (req.query.libraryId) {
            conditions['libraryId'] = parseInt(req.query.libraryId);
        }

        const list = await getShiftAndPrices({ conditions, pagination });

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Shift & Prices Fetched Successfully", list));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

export async function getById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Id is required");

        const data = await getShiftAndPriceById(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Shift & Price Fetched Successfully", data));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

export async function deleteById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Id is required");

        const data = await deleteShiftAndPrice(parseInt(id), {
            deletedAt: new Date(),
            deletedBy: req.user?.id ?? null
        });

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Shift & Price Deleted Successfully", data));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

export async function updateById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) throw new Error("Id is required");

        if (Object.keys(req.body).length === 0) throw new Error("Data is required");

        await updateShiftAndPrice(parseInt(id), req.body);

        const updated = await getShiftAndPriceById(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, "Shift & Price Updated Successfully", updated));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

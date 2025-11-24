import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { getOffset } from "../Utils/helper.js";
import {
    getLibraryFacilities,
    getLibraryFacility,
    updateLibraryFacility,
    deleteLibraryFacility,
    createLibraryFacility,
} from "../Services/libraryFacility.service.js";
import { validationResult } from "express-validator";


export async function create(req, res) {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));
        }
        let postRequest = req.body
        const locationData = await createLibraryFacility({ ...postRequest });

        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'Library Facility Created Successfully', locationData));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}


// Get all facilities
export async function getAllLibraryFacilities(req, res) {
    try {
        const { limit = 10, page, libraryId, libraryLocationId } = req.query;
        const skip = getOffset(limit, page);
        let pagination = { take: parseInt(limit), skip };
        let conditions = {};

        if (libraryId) conditions["libraryId"] = parseInt(libraryId);
        if (libraryLocationId)
            conditions["libraryLocationId"] = parseInt(libraryLocationId);

        const facilities = await getLibraryFacilities({ conditions, pagination });

        return res
            .status(ApiResponseCode.OK)
            .json(
                new api_response(
                    true,
                    ApiResponseCode.OK,
                    "Library Facilities Fetched Successfully",
                    facilities
                )
            );
    } catch (error) {
        return res
            .status(ApiResponseCode.BAD_REQUEST)
            .json(
                new api_response(
                    false,
                    ApiResponseCode.BAD_REQUEST,
                    error.message
                )
            );
    }
}

// Get a single facility
export async function getLibraryFacilityById(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) throw new Error("Facility ID is required");

        const facility = await getLibraryFacility(parseInt(id));

        return res
            .status(ApiResponseCode.OK)
            .json(
                new api_response(
                    true,
                    ApiResponseCode.OK,
                    "Library Facility Fetched Successfully",
                    facility
                )
            );
    } catch (error) {
        return res
            .status(ApiResponseCode.BAD_REQUEST)
            .json(
                new api_response(
                    false,
                    ApiResponseCode.BAD_REQUEST,
                    error.message
                )
            );
    }
}

// Update a facility
export async function updateLibraryFacilityById(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) throw new Error("Facility ID is required");

        if (Object.keys(req.body).length === 0)
            throw new Error("Update data is required");

        await updateLibraryFacility(parseInt(id), req.body);
        const updatedFacility = await getLibraryFacility(parseInt(id));

        return res
            .status(ApiResponseCode.CREATED)
            .json(
                new api_response(
                    true,
                    ApiResponseCode.OK,
                    "Library Facility Updated Successfully",
                    updatedFacility
                )
            );
    } catch (error) {
        return res
            .status(ApiResponseCode.BAD_REQUEST)
            .json(
                new api_response(
                    false,
                    ApiResponseCode.BAD_REQUEST,
                    error.message
                )
            );
    }
}

// Delete (soft delete) a facility
export async function deleteLibraryFacilityById(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) throw new Error("Facility ID is required");

        const deletedFacility = await deleteLibraryFacility(parseInt(id), {
            deletedAt: new Date(),
            deletedBy: req.user?.id || null,
        });

        return res
            .status(ApiResponseCode.OK)
            .json(
                new api_response(
                    true,
                    ApiResponseCode.OK,
                    "Library Facility Deleted Successfully",
                    deletedFacility
                )
            );
    } catch (error) {
        return res
            .status(ApiResponseCode.BAD_REQUEST)
            .json(
                new api_response(
                    false,
                    ApiResponseCode.BAD_REQUEST,
                    error.message
                )
            );
    }
}

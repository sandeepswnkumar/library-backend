import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { getOffset } from "../Utils/helper.js";
import {
    getLibraryLocations,
    getLibraryLocation,
    updateLibraryLocation,
    deleteLibraryLocation,
    createLibraryLocation
} from "../Services/libraryLocation.service.js";
import { validationResult } from "express-validator";



export async function create(req, res) {
    try {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            return res.status(ApiResponseCode.BAD_REQUEST)
                .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));
        }
        let postRequest = req.body
        delete postRequest['libraryName']
        const locationData = await createLibraryLocation({ ...postRequest });

        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'Library Location Created Successfully', locationData));

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

// GET all library locations with optional filters
export async function getAllLibraryLocations(req, res) {
    try {
        const { limit = 10, page, cityId, stateId, countryId } = req.query;
        const skip = getOffset(limit, page);
        let pagination = { take: parseInt(limit), skip };
        let conditions = {};

        if (cityId) conditions['cityId'] = parseInt(cityId);
        if (stateId) conditions['stateId'] = parseInt(stateId);
        if (countryId) conditions['countryId'] = parseInt(countryId);

        const locations = await getLibraryLocations({ conditions, pagination }, true);

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Locations Fetched Successfully', locations));
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

// GET a single library location by ID
export async function getLibraryLocationById(req, res) {
    try {
        const { id } = req.params;
        if (!parseInt(id)) {
            throw new Error("LibraryLocation ID is required");
        }

        const location = await getLibraryLocation(parseInt(id));

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Location Fetched Successfully', location));
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

// UPDATE a library location by ID
export async function updateLibraryLocationById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) {
            throw new Error("LibraryLocation ID is required");
        }

        if (Object.keys(req.body).length === 0) {
            throw new Error("Update data is required");
        }
        let updateData = req.body
        delete updateData['libraryName']
        await updateLibraryLocation(parseInt(id), updateData);
        const updatedLocation = await getLibraryLocation(parseInt(id));

        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Location Updated Successfully', updatedLocation));
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

// DELETE (soft-delete) a library location by ID
export async function deleteLibraryLocationById(req, res) {
    try {
        const { id } = req.params;

        if (!parseInt(id)) {
            throw new Error("LibraryLocation ID is required");
        }

        // Assuming soft delete: setting isActive = false and deletedAt = current time
        const deletedLocation = await deleteLibraryLocation(parseInt(id), {
            isActive: false,
            deletedAt: new Date()
        });

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Location Deleted Successfully', deletedLocation));
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message));
    }
}

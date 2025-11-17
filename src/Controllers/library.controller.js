import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { getOffset } from "../Utils/helper.js";
import { createLibrary, deleteLibrary, getLibraries, getLibrary, libraryExists, updateLibrary } from "../Services/library.service.js";
import { validationResult } from "express-validator";


export async function create(req, res) {
    try {
        const validationError = validationResult(req);

        if (!validationError.isEmpty()) return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, validationError.array()));

        const { libraryName } = req.body;
        const library = await libraryExists({ libraryName })
        if (library) throw new Error('Library already exists');

        const libaryData = await createLibrary({ ...req.body })
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'Library Created Successfully', libaryData))

    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}


export async function getAllLibrary(req, res) {
    try {
        const { limit = 10, page, libraryName } = req.query
        const skip = getOffset(limit, page)
        let pagination = { take: parseInt(limit), skip }
        let conditions = {}
        if (libraryName) conditions['libraryName'] = { "contains": libraryName, mode: 'insensitive' }
        const libraries = await getLibraries({ conditions, pagination }, true)

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Fetched Successfully', libraries))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function getLibraryById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("Library id is required")
        }
        const library = await getLibrary(parseInt(id))
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Fetched Successfully', library))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function deleteLibraryById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("Library id is required")
        }
        const library = await deleteLibrary(parseInt(id))
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Deleted Successfully', library))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function updateLibraryById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("Library id is required")
        }
        if (Object.keys(req.body).length == 0) {
            throw new Error("Data is required")
        }
        await updateLibrary(parseInt(id), req.body)
        const library = await getLibrary(parseInt(id))
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Updated Successfully', library))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

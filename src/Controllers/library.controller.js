import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { getOffset } from "../Utils/helper.js";
import { deleteLibrary, getLibraries, getLibrary, updateLibrary } from "../Services/library.service.js";



export async function getAllLibrary(req, res) {
    try {
        const { limit=10, page, name, email } = req.query
        const skip = getOffset(limit, page)
        let pagination = { take: parseInt(limit), skip }
        let conditions = {}
        if (email) conditions['email'] = name
        if (name) conditions['name'] = name

        const libraries = await getLibraries({ conditions, pagination })

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
        if(!parseInt(id)){
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
        if(!parseInt(id)){
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
        const {id} = req.params
        if(!parseInt(id)){
            throw new Error("Library id is required")
        }
        if(Object.keys(req.body).length == 0){
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

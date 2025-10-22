import ApiResponseCode from "../Enums/apiResponseCode.js"
import { getLibraryType } from "../Services/libraryType.service.js"
import api_response from "../Utils/apiResponse.js"



export async function getType(req, res) {
    try {
        const user = await getLibraryType(req.user.id)
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Type Fetched Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
import ApiResponseCode from "../Enums/apiResponseCode.js"
import { getLibraryStatus } from "../Services/libraryStatus.service.js"
import api_response from "../Utils/apiResponse.js"


export async function getStatus(req, res) {
    try {
        const user = await getLibraryStatus(req.user.id)
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Library Status Fetched Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
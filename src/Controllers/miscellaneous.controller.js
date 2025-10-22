import ApiResponseCode from "../Enums/apiResponseCode.js"
import { getCities, getCountry, getState } from "../Services/miscellaneous.service.js"
import api_response from "../Utils/apiResponse.js"



export async function cities(req, res) {
    try {
        const cities = await getCities()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'City Fetched Successfully', cities))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function states(req, res) {
    try {
        const state = await getState()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'State Fetched Successfully', state))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function country(req, res) {
    try {
        const country = await getCountry()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Country Fetched Successfully', country))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
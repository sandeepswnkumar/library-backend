import ApiResponseCode from "../Enums/apiResponseCode.js"
import { getBookingUnit, getCities, getCountry, getFacilities, getRoomType, getState } from "../Services/miscellaneous.service.js"
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
export async function roomType(req, res) {
    try {
        const roomType = await getRoomType()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Room Type Fetched Successfully', roomType))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function bookingUnit(req, res) {
    try {
        const roomType = await getBookingUnit()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Booking Unit Fetched Successfully', roomType))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function facilities(req, res) {
    try {
        const roomType = await getFacilities()
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'Facilities Fetched Successfully', roomType))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

import api_response from "../Utils/apiResponse.js";
import ApiResponseCode from "../Enums/apiResponseCode.js";
import { deleteUser, getUser, getUsers, updateUserDetails } from "../Services/user.service.js";
import { getOffset } from "../Utils/helper.js";

export async function getAllUsers(req, res) {
    try {
        const { limit = 10, page, name, email } = req.query
        const skip = getOffset(limit, page)
        let pagination = { take: parseInt(limit), skip }
        let conditions = {}
        if (email) conditions['email'] = name
        if (name) conditions['name'] = name

        const users = await getUsers({ conditions, pagination })

        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'User Fetched Successfully', users))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function getUserById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("User id is required")
        }
        const user = await getUser(parseInt(id))
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'User Fetched Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function deleteUserById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("User id is required")
        }
        const user = await deleteUser(parseInt(id))
        return res.status(ApiResponseCode.OK)
            .json(new api_response(true, ApiResponseCode.OK, 'User Deleted Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}
export async function updateUsersById(req, res) {
    try {
        const { id } = req.params
        if (!parseInt(id)) {
            throw new Error("User id is required")
        }
        if (Object.keys(req.body).length == 0) {
            throw new Error("Data is required")
        }
        await updateUserDetails(parseInt(id), req.body)
        const user = await getUser(parseInt(id))
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.OK, 'User Updated Successfully', user))
    } catch (error) {
        return res.status(ApiResponseCode.BAD_REQUEST)
            .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

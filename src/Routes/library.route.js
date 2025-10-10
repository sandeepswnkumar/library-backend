import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById, updateUsersById } from "../Controllers/user.controller.js";

const router = Router()

//Open Route
router.route('/').get(getAllUsers)
router.route('/:id').get(getUserById)
router.route('/:id').delete(deleteUserById)
router.route('/update-profile/:id').put(updateUsersById)


export default router;
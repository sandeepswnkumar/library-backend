import { Router } from "express";
import { cities, country, roomType, states } from "../Controllers/miscellaneous.controller.js";


const router = Router();

router.route('/cities').get(cities)
router.route('/states').get(states)
router.route('/country').get(country)
router.route('/roomType').get(roomType)

export default router;
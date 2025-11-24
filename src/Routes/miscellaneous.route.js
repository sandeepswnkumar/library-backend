import { Router } from "express";
import { bookingUnit, cities, country, facilities, roomType, states } from "../Controllers/miscellaneous.controller.js";


const router = Router();

router.route('/cities').get(cities)
router.route('/states').get(states)
router.route('/country').get(country)
router.route('/roomType').get(roomType)
router.route('/bookingUnit').get(bookingUnit)
router.route('/facilities').get(facilities)

export default router;
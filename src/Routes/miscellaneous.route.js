import { Router } from "express";
import { cities, country, states } from "../Controllers/miscellaneous.controller.js";


const router = Router();

router.route('/cities').get(cities)
router.route('/states').get(states)
router.route('/country').get(country)

export default router;
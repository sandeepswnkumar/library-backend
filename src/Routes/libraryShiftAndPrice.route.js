import { Router } from "express";
import {
  create,
  getAll,
  getById,
  updateById,
  deleteById
} from "../Controllers/libraryShiftAndPrice.controller.js";

import CreateShiftAndPriceRequest from "../Requests/CreateShiftAndPriceRequest.js";

const router = Router();

router.route('/')
  .post(CreateShiftAndPriceRequest, create)
  .get(getAll);

router.route('/:id')
  .get(getById)
  .put(updateById)
  .delete(deleteById);

export default router;

import { Router } from "express";
import CreateLibraryRequest from "../Requests/CreateLibraryRequest.js";
import { create, deleteLibraryById, getAllLibrary, getLibraryById, updateLibraryById } from "../Controllers/library.controller.js";
import { getStatus } from "../Controllers/libraryStatus.controller.js";
import { getType } from "../Controllers/libraryType.controller.js";

const router = Router()

router.route('/library-status').get(getStatus)
router.route('/library-type').get(getType)



router.route('/').post(CreateLibraryRequest ,create)
router.route('/').get(getAllLibrary)
router.route('/:id').get(getLibraryById)
router.route('/:id').delete(deleteLibraryById)
router.route('/:id').put(updateLibraryById)


export default router;
import express from "express"
import { adminAddAnyItem, adminAllItem, adminDeleteAnyItem } from "../controllers/itemController.js"
const router = express.Router()

// import controller 
import {createAdmin, deleteUser, loginAdmin} from "../controllers/userController.js"
// import userMiddlewares
import {isLoggedIn,customRole} from "../middlewares/userMiddlewares.js"

// user routes
router.route("/signup").post(createAdmin)
router.route("/login").post(loginAdmin)
router.route("/deleteAdmin").post(deleteUser)

// admin routes
router.route("/admin/addItem").post(isLoggedIn,customRole("admin"), adminAddAnyItem)
router.route("/admin/deleteItem/:id").delete(isLoggedIn,customRole("admin"), adminDeleteAnyItem)
// router.route("/admin/allItems").get(isLoggedIn,customRole("admin"), adminAllItem)
router.route("/admin/allItems").get(adminAllItem)




export default router;
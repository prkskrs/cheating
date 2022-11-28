import express from "express"
import { adminAddAnyEmployee,  adminAllEmployee,  adminDeleteAnyEmployee,adminUpdateAnyEmployee} from "../controllers/employeeController.js"
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
router.route("/admin/addEmp").post(isLoggedIn,customRole("admin"), adminAddAnyEmployee)
router.route("/admin/deleteEmp/:id").delete(isLoggedIn,customRole("admin"), adminDeleteAnyEmployee)
router.route("/admin/allEmps").get(isLoggedIn,customRole("admin"), adminAllEmployee)
router.route("/admin/updateEmp/:id").put(isLoggedIn,customRole("admin"), adminUpdateAnyEmployee)




export default router;
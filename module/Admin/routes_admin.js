const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const adminController = require("./controller_admin")
const adminSchemas = require("../../schema/admin")
const { authenticateToken } = require("../../middleware/auth")

router.route('/')
  .get(
    authenticateToken,
    adminController.detailAdmin
  )

router
  .route("/login")
  .post(
    validateBody(adminSchemas.loginAdmin), 
    adminController.loginAdmin
  )

router.route("/register")
  .post(
    validateBody(adminSchemas.registerAdmin),
    adminController.regisAdmin
  )

module.exports = router

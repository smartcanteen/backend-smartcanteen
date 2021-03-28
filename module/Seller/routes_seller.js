const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const sellerController = require("./controller_seller")
const sellerSchemas = require("../../schema/seller")
const { authenticateToken } = require("../../middleware/auth")

router.route('/')
  .get(
    authenticateToken,
    sellerController.detailSeller
  )

router.route('/all')
  .get(
    authenticateToken,
    sellerController.getAllSeller
  )

router
  .route("/login")
  .post(
    validateBody(sellerSchemas.loginSeller), 
    sellerController.loginSeller
  )

router.route("/register")
  .post(
    authenticateToken,
    validateBody(sellerSchemas.registerSeller),
    sellerController.regisSeller
  )

module.exports = router

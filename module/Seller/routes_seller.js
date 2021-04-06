const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_seller = require("./controller_seller")
const sellerSchemas = require("../../schema/seller")
const { authenticateToken } = require("../../middleware/auth")
const sellerController = new controller_seller()

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

router.route("/update")
  .post(
    authenticateToken,
    validateBody(sellerSchemas.updateSeller),
    sellerController.updateSeller
  )

router.route("/update/:id")
  .post(
    authenticateToken,
    validateBody(sellerSchemas.updateSeller),
    sellerController.updateSeller
  )

router.route('/:id')
  .get(
    authenticateToken,
    sellerController.detailSeller
  )

module.exports = router

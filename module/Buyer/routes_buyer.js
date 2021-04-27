const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_order = require("./controller_buyer")
const buyerSchemas = require("../../schema/buyer")
const { authenticateToken } = require("../../middleware/auth")
const orderController = new controller_order()


// router.route("/all").get(authenticateToken, sellerController.getAllSeller)

// router
//   .route("/login")
//   .post(validateBody(sellerSchemas.loginSeller), sellerController.loginSeller)

router
  .route("/register")
  .post(
    validateBody(buyerSchemas.registerBuyer),
    orderController.regisBuyer,
  )

// router
//   .route("/update")
//   .post(
//     authenticateToken,
//     validateBody(sellerSchemas.updateSeller),
//     sellerController.updateSeller,
//   )

router
  .route("/update/:id")
  .post(
    validateBody(buyerSchemas.updateBuyer),
    orderController.updateBuyer,
  )

// router.route("/:id").get(authenticateToken, sellerController.detailSeller)

module.exports = router

const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_order = require("./controller_buyer")
const buyerSchemas = require("../../schema/buyer")
const { authenticateToken } = require("../../middleware/auth")
const orderController = new controller_order()

router
  .route("/register")
  .post(
    validateBody(buyerSchemas.registerBuyer),
    orderController.regisBuyer,
  )

router
  .route("/update/:id")
  .post(
    validateBody(buyerSchemas.updateBuyer),
    orderController.updateBuyer,
  )

module.exports = router

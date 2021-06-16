const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_order = require("./controller_order")
// const sellerSchemas = require("../../schema/seller")
const { authenticateToken } = require("../../middleware/auth")
const orderController = new controller_order()

router.route("/").post(orderController.orderMakanan)
router.route("/statistikAdmin").get(orderController.statistikAdmin)

router.route("/warung").get(authenticateToken, orderController.getOrderByWarung)
router.route("/warung/:id").get(authenticateToken, orderController.getOrderByWarung)

router
  .route("/update/:id/:status")
  .post(
    authenticateToken,
    // validateBody(sellerSchemas.updateSeller),
    orderController.updateStatus,
  )

router.route("/:id").get(orderController.getOrder)

module.exports = router

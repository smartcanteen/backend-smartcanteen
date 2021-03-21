const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const foodController = require("./controller_food")
// const foodSchemas = require("../../schema/food")
const { authenticateToken } = require("../../middleware/auth")

router.route('/:id')
  .get(
    authenticateToken,
    foodController.detailMakanan
  )

router.route("/add")
  .post(
    authenticateToken,
    validateBody(sellerSchemas.registerSeller),
    foodController.tambahMakanan
  )

module.exports = router

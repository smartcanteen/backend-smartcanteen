const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_food = require("./controller_food")
const foodSchemas = require("../../schema/food")
const { authenticateToken } = require("../../middleware/auth")
const foodController = new controller_food()

router
  .route("/add")
  .post(
    authenticateToken,
    validateBody(foodSchemas.tambahMakanan),
    foodController.tambahMakanan
  )
router.route("/all").get(authenticateToken, foodController.getAllMakanan)

router
  .route("/update/:id")
  .post(
    authenticateToken,
    validateBody(foodSchemas.updateMakanan),
    foodController.updateMakanan
  )

router.route("/:id").get(authenticateToken, foodController.detailMakanan)
module.exports = router

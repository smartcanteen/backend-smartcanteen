const router = require("express-promise-router")()

// validation
const { validateBody } = require("../../helpers/validator/validateBody")
const controller_tenant = require("./controller_tenant")
const tenantSchemas = require("../../schema/tenant")
const { authenticateToken } = require("../../middleware/auth")
const tenantController = new controller_tenant()

router.route("/").get(authenticateToken, tenantController.detailTenant)

router.route("/all").get(tenantController.getAllTenant)

router
  .route("/register")
  .post(
    authenticateToken,
    validateBody(tenantSchemas.registerTenant),
    tenantController.regisTenant,
  )

router
  .route("/update")
  .post(
    authenticateToken,
    validateBody(tenantSchemas.updateTenant),
    tenantController.updateTenant,
  )

router
  .route("/update/:id")
  .post(
    authenticateToken,
    validateBody(tenantSchemas.updateTenant),
    tenantController.updateTenant,
  )

router.route("/:id").get(tenantController.detailTenant)

module.exports = router

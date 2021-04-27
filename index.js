const express = require("express")
const app = express()
// const bodyParser = require("body-parser")
require("dotenv").config()
const cors = require("cors")
require("./middleware/auth")

const response = require("./middleware/response")
const db = require("./config/database")
require("./config/relation")
// const flamelinkApp = require('./config/flamelinkSDK')

// cors
let allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost",
]

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg = "The CORS policy for this site does not "
          + "allow access from the specified Origin."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  }),
)
// app.use(
//   cors({
//     credentials: true,
//     origin: true
//   })
// )
// app.use(cors())

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(response)

// router
const adminRoute = require("./module/Admin/routes_admin")
const sellerRoute = require("./module/Seller/routes_seller")
const buyerRoute = require("./module/Buyer/routes_buyer")
const foodRoute = require("./module/Food/routes_food")
const tenantRoute = require("./module/Tenant/routes_tenant")
const orderRoute = require("./module/Order/routes_order")

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/api/admin", adminRoute)
app.use("/api/penjual", sellerRoute)
app.use("/api/pembeli", buyerRoute)
app.use("/api/makanan", foodRoute)
app.use("/api/warung", tenantRoute)
app.use("/api/order", orderRoute)

// error handling
app.use((req, res, next) => {
  let err = new Error("Route not found")
  err.status = 404
  next(err)
})

app.use(async (err, req, res) => {
  // deleteFoto(req)
  const { message } = err
  const status = err.status || 500
  console.log(err)
  res.sendError(null, message, status)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  db.sync({})
    // db.sync({ force:true })
    .then(() => console.log(`app is running on port ${port}`))
    .catch((err) => console.log(err.message))
  console.log(`app is running on port ${port}`)
})

module.exports = (req, res, next) => {
  // add code for middleware
  res.sendResponse = (data, message = null, status = 200) => {
    return res.status(status).send({
      success: true,
      data,
      message,
    })
  }

  res.sendError = (data = {}, message = null, status = 400) => {
    if (data == null) data = {}
    return res.status(status).send({
      success: false,
      data,
      message,
    })
  }

  req.customError = (message, status) => {
    let err = new Error(message)
    err.status = status
    return err
  }

  return next() // use next to go next router
}

const responseObject = require('../../utils/responseObject')

module.exports = (req, res, next)=>{
    console.log(`-> [UNKNOWN] ${req.originalUrl}`)
    console.log(`<- [404] ${req.originalUrl}`)

    return responseObject(res, 404, null, "Route not found")
}
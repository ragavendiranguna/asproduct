const responseObject = require('../../utils/responseObject')

module.exports = (err, req, res, next)=>{
    console.log(`-> [UNKNOWN] ${req.originalUrl}`)
    console.log(`<- [ERROR] ${err.message}`)

    return responseObject(res, 500, null, err.stack)
}
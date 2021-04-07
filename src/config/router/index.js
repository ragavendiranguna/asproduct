const express = require('express')

let publicRoutes = express.Router()
require('../../components/routes/toDo/public')(publicRoutes)

module.exports = (api)=>{

    api.use('/', publicRoutes)
    api.use('/product', ()=>{})

}
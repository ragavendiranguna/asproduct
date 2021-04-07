const BASE = '/to-do/'

const responseObject = require('../../../../utils/responseObject')
const toDoCore = require('../../../core/toDo')

module.exports = (app) => {

    app.post(`${BASE}new`, async function (req, res, next) {

        console.log(`-> [POST] ${req.originalUrl}`)

        let response = await toDoCore.newToDoItem(req.body)

        console.log(`<- [POST] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.put(`${BASE}edit-description/:id`, async function (req, res, next) {

        console.log(`-> [PUT] ${req.originalUrl}`)

        let response = await toDoCore.editDescription(req.params.id, req.body)

        console.log(`<- [PUT] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.put(`${BASE}set-as-done/:id`, async function (req, res, next) {

        console.log(`-> [PUT] ${req.originalUrl}`)

        let response = await toDoCore.setStatus(req.params.id, true)

        console.log(`<- [PUT] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.put(`${BASE}set-as-pending/:id`, async function (req, res, next) {

        console.log(`-> [PUT] ${req.originalUrl}`)

        let response = await toDoCore.setStatus(req.params.id, false)

        console.log(`<- [PUT] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.delete(`${BASE}remove/:id`, async function (req, res, next) {

        console.log(`-> [DELETE] ${req.originalUrl}`)

        let response = await toDoCore.remove(req.params.id)

        console.log(`<- [DELETE] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.delete(`${BASE}remove-all`, async function (req, res, next) {

        console.log(`-> [DELETE] ${req.originalUrl}`)

        let response = await toDoCore.removeAll(req.params.id)

        console.log(`<- [DELETE] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

    app.get(`${BASE}`, async function (req, res, next) {

        console.log(`-> [GET] ${req.originalUrl}`)

        let response = await toDoCore.getAll()

        console.log(`<- [GET] ${req.originalUrl}`)

        return responseObject(res, response.status, response.data, response.error)
    })

}
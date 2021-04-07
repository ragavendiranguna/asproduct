const toDoItemModel = require('../../model/toDoItem')

let newToDoItem = async (data)=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {
        if(!data.description){
            resp.status = 400
            resp.error = "Invalid params"
            return resp
        }

        let tdItem = { description: data.description }

        let toDoItem = await toDoItemModel.create(tdItem)

        resp.status = 200
        resp.data = toDoItem
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

let editDescription = async (id, data)=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {
        if(!data.description || !id){
            resp.status = 400
            resp.error = "Invalid params"
            return resp
        }

        let toDoItem = await toDoItemModel.findOne( { _id: id } )

        if(toDoItem){

            toDoItem.description = data.description

            await toDoItem.save()

            resp.status = 200
            resp.data = toDoItem
        }
        else{
            resp.status = 400
            resp.error = "Invalid params"
        }
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

let setStatus = async (id, status)=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {
        if(!id){
            resp.status = 400
            resp.error = "Invalid params"
            return resp
        }

        let toDoItem = await toDoItemModel.findOne( { _id: id } )

        if(toDoItem){

            toDoItem.done = status

            await toDoItem.save()

            resp.status = 200
            resp.data = toDoItem
        }
        else{
            resp.status = 400
            resp.error = "Invalid params"
        }
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

let remove = async (id)=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {
        if(!id){
            resp.status = 400
            resp.error = "Invalid params"
            return resp
        }

        await toDoItemModel.deleteOne( { _id: id } )

        resp.status = 200
        resp.data = true
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

let removeAll = async ()=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {
        await toDoItemModel.deleteMany()
        resp.status = 200
        resp.data = true
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

let getAll = async ()=>{
    let resp = {
        data: null,
        status: null,
        error: null
    }

    try {

        let toDoItens = await toDoItemModel.find({})

        resp.status = 200
        resp.data = toDoItens
        
        return resp
    } catch (error) {
        resp.status = 500
        resp.error = error.message
        return resp
    }
}

module.exports = {
    newToDoItem: async (data)=>{
        return await newToDoItem(data)
    },
    editDescription: async (id, data)=>{
        return await editDescription(id, data)
    },
    setStatus: async (id, status)=>{
        return await setStatus(id, status)
    },
    remove: async (id)=>{
        return await remove(id)
    },
    removeAll: async ()=>{
        return await removeAll()
    },
    getAll: async ()=>{
        return await getAll()
    }

}
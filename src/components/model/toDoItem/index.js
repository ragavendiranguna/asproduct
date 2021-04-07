const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const ToDoItemSchema = new Schema(
    {
        description: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
        done: { type: Boolean, default: false }
    }
);

module.exports = mongoose.model('ToDoItemModel', ToDoItemSchema)


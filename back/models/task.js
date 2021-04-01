const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content: String,
    statut : String,
    //poleId: String
})

taskSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Task', taskSchema)
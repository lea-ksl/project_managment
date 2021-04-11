const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    desc: String,
    chiefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    poles : [
        {
            pole: {type: mongoose.Types.ObjectId, ref: 'Pole'}
        }
    ]
})

projectSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Project', projectSchema);
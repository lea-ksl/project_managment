const mongoose = require('mongoose');

const poleSchema = new mongoose.Schema({
    title: String,
    desc : String,
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

poleSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Pole', poleSchema)
const mongoose = require('mongoose')
const {Schema} = mongoose

//Schemas
const breadSchema = new Schema({
    name: {type: String, required: true },
    hasGluten: { type: Boolean},
    image: { type: String, default: 'http://placehold.it/500x500.png'},
    baker: {
        type: Schema.Types.ObjectId,
        ref: 'Baker'     
    }
})

//Helper Methods
breadSchema.methods.getBakedBy = function () {
    return `${this.name} was hand rolled and baked by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread


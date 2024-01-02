const {Schema, model} = require('../connection');

const myschema = new Schema({
    title : String,
    type : String,
    material: String,
    price: Number,
    image: String,
    createdAt:Date,

});

module.exports = model('furniture', myschema);
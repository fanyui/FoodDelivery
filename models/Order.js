const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId
var Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    products:[],
    orderDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Order',orderSchema)
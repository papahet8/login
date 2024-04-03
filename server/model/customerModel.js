const mongoose = require('mongoose');
const Customer = new mongoose.Schema({
    customerName: {
        type: String,
        trim: true,
        required: true
    },
    customerEmail: {
        type: String,
        trim: true,
        required: true
    },
    customerAddress: {
        type: String,
        trim: true,
        required: true
    },
    customerMobile: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collection: "customers",
    timestamps: true,
});

module.exports = mongoose.model("Customer", Customer);
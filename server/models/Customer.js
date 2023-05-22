const { Schema, model, mongoose } = require('mongoose');
const Asset = require('./Asset');
const Income = require('./Income');

const customerSchema = new Schema({
    customerid: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    first: {
      type: String,
      required: true,
    },
    last: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactnumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    income: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Income',
    }
        ],
    assets: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Asset',
    }
        ],

    totalincome: {
        type: Number,
    },
    totalassets: {
        type: Number,
    }
});
const Customer = model('Customer', customerSchema);

module.exports = Customer;

const { Schema, model, mongoose } = require('mongoose');

const customerSchema = new Schema({
    customerId: {
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
    totalincome: {
        type: Number,
    },
    totalassets: {
        type: Number,
    }
});
const Customer = model('Customer', customerSchema);

module.exports = Customer;

const { Schema, model, mongoose } = require('mongoose');

const incomeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    type: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    incomesource: {
        type: String,
        required: true,
    },
    payfrequency: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    customerid: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});
const Income = model('Income', incomeSchema);

module.exports = Income;

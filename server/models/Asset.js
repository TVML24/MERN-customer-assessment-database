const { Schema, model, mongoose } = require('mongoose');

const assetSchema = new Schema({
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
    asxcode: {
      type: String,
      required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    numberunits: {
        type: Number,
        required: true,
    },
    priceperunit: {
        type: Number,
        required: true,
    },
    customerid: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});
const Asset = model('Asset', assetSchema);

module.exports = Asset;

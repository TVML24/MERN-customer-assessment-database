const { Schema, model } = require('mongoose');

const ruleSchema = new Schema({
    rulename: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    agemin: {
        type: Number,
        required: true,
    },
    agemax: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    incomemax: {
        type: Number,
        required: true,
    },
    incomemin: {
        type: Number,
        required: true,
    },
    assetsmax: {
        type: Number,
        required: true,
    },
    assetsmin: {
        type: Number,
        required: true,
    }
});
const Rule = model('Rule', ruleSchema);

module.exports = Rule;

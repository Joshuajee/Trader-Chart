const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
    {
        timestamp: {
            type: Date
        },
        symbol: {
            type: String
        },
        category: {
            type: String
        },
        source: {
            type: String
        },
        values: {
            type: Object
        }
    }
);

module.exports = mongoose.model('assets', assetSchema);

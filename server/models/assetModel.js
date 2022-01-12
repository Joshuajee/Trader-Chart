const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
    {
        timestamp: {
            type: Date
        },
        metadata: {
            type: Object
        },
        values: {
            type: Object
        }
    }
);

module.exports = mongoose.model('assets', assetSchema);


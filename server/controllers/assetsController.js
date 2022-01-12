const catchAsync = require('./../utils/catchAsync');
const Asset = require('./../models/assetModel');

exports.getAssets = catchAsync(async (req, res, next) => {
    const {asset, tf, start, count} = req.params
    console.log(req.params)

    
    const assets = await Asset.find({'metadata.symbol': asset})
                    .skip(Number(start)).limit(Number(count)).sort({timestamp: -1});

    const counts = await Asset.countDocuments({'metadata.symbol': asset});


    res.json({
        status: 'success',
        data: assets.reverse(),
        count: counts
        })
});


exports.getCategory = catchAsync(async (req, res, next) => {

    const category = await Asset.distinct('metadata')



    res.json({
        status: 'success',
        data: category,

        })
});


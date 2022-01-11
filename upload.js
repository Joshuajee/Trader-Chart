const prompt = require('prompt-sync')();
const path = require('path');
const fs = require('fs')
const Assets = require('./server/models/assetModel');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE;

const inc = 500


const upload = async (start, finish, asset, symbol) => {
    console.log(start)
    const data = asset.slice(start, finish).map(item => {
        return {
          timestamp: new Date(item.date + " " + item.time),
          symbol: symbol,
          values: { open: item.open, high: item.high, low: item.low, close: item.close, tickvol: item.tickvol, vol: item.vol, spread: item.spread }
        }
    })

    try {
        await Assets.insertMany(data).then(data => {}, err => {});

        console.log((finish/max) * 100)
        
        await upload(start + inc, finish + inc <= max ? finish + inc: max, max, assets, symbol)

        //console.log(val)
    } catch (err) {
        //console.log(err)
    }
}




mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful!');

    const assetType = prompt('Asset Type:  ');
    const asset = prompt('Asset:  ');

    console.log(assetType)

    console.log(asset)


    try {
      const data = fs.readFileSync(file, 'utf8')
      //console.log(data)
      console.log(data.length)
    } catch (err) {
      console.error(err)
    }


    //upload(0, 500, max, symbol)

  });


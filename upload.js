const Assets = require('./models/assetModel');
const eurusd = require('./Data/EURUSD_M1.json');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE;

const max = eurusd.length
const inc = 500


const upload = async (start, finish) => {
    console.log(start)
    const data = eurusd.slice(start, finish).map(item => {
        return {
          timestamp: new Date(item.date + " " + item.time),
          symbol: 'EURUSD',
          values: { open: item.open, high: item.high, low: item.low, close: item.close, tickvol: item.tickvol, vol: item.vol, spread: item.spread }
        }
    })

    try {
        await Assets.insertMany(data).then(data => {}, err => {});

        console.log((finish/max) * 100)
        
        await upload(start + inc, finish + inc <= max ? finish + inc: max, max )

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

    upload(0, 500, max)

  });


  console.log(max)


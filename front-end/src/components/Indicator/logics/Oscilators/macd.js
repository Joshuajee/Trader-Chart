import { ema, sma } from "../Trends/movingAverages"


const macd = (data, indicator) => {

    const fastEMAObj = {...indicator, period: indicator.fastEMA};

    const fastEMA = ema(data, fastEMAObj)

    const slowEMAObj = {...indicator, period: indicator.slowEMA};

    const slowEMA = ema(data, slowEMAObj)

    const MACD = []

    for (let i = 0; i < slowEMA.length; i++) {

        const macdLine = fastEMA[i].y - slowEMA[i].y

        const result = {
            timestamp: slowEMA[i].x,
            values: {close: macdLine},
        }

        MACD.push(result)
    }

    const macdObj = {...indicator, period: indicator.macdSMA, applyTo: 'close'};

    const macdSMA = sma(MACD, macdObj)

    const result = MACD?.map( (element, index) => {

        const result = {}

            result.x = macdSMA[index].x
            result.macdSMA = macdSMA[index].y
            result.macdLine = element.values.close
            result.macdHist = element.values.close - macdSMA[index].y

        return result
        
    })

    return result

}


export default macd
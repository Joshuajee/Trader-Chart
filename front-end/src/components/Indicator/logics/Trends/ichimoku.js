import { sma } from "./movingAverages";
import moment from "moment";

const ichimoku = (data, indicator) => {

    const tenkanSenHighObj = {...indicator, period: indicator.tenkanSen, applyTo: 'high'};    
    const tenkanSenHigh = sma(data, tenkanSenHighObj)
    const tenkanSenLowObj = {...indicator, period: indicator.tenkanSen, applyTo: 'low'};
    const tenkanSenLow = sma(data, tenkanSenLowObj)

    const kijunSenHighObj = {...indicator, period: indicator.kijunSen, applyTo: 'high'};    
    const kijunSenHigh = sma(data, kijunSenHighObj)
    const kijunSenLowObj = {...indicator, period: indicator.kijunSen, applyTo: 'low'};
    const kijunSenLow = sma(data, kijunSenLowObj)

    const senkouHighObj = {...indicator, period: indicator.senkou, applyTo: 'high'};    
    const senkouHigh = sma(data, senkouHighObj)
    const senkouLowObj = {...indicator, period: indicator.senkou, applyTo: 'low'};
    const senkouLow = sma(data, senkouLowObj)

    const laggingSpanObj = {...indicator, period: indicator.kijunSen, applyTo: 'close'};
    const laggingSpan = sma(data, laggingSpanObj)

    const CL = []
    const BL = []
    const LSA = []
    const LSB = []
    const LAG = []
    const CLOUD = []

    for (let i = 0; i < tenkanSenHigh.length; i++) {

        const cl = (tenkanSenHigh[i].y + tenkanSenLow[i].y ) / 2
        const bl = (kijunSenHigh[i].y + kijunSenLow[i].y ) / 2

        CL.push({x: kijunSenHigh[i].x, y: cl})
        BL.push({x: kijunSenHigh[i].x, y: bl})

    }

    for (let i = 0; i < tenkanSenHigh.length + indicator.kijunSen; i++) {

        const lag = i - indicator.kijunSen

        if (lag >= 0 ) {
            const lsA = (CL[lag].y + BL[lag].y) / 2
            const lsB = (senkouHigh[lag].y + senkouLow[lag].y) / 2

            if (tenkanSenHigh.length  > i) {

                LAG.push({ x: laggingSpan[lag].x, y: laggingSpan[i].y})
                LSA.push({ x: laggingSpan[i].x, y: lsA})
                LSB.push({ x: laggingSpan[i].x, y: lsB})

                CLOUD.push({ x: laggingSpan[i].x, lsA:lsA, lsB: lsB})

            } else {

                let date = new Date(laggingSpan[tenkanSenHigh.length - 1].x).getTime() / 1000

                date = date + 60 * (i - tenkanSenHigh.length)
            
                date = moment.utc(moment((new Date(date * 1000)).toUTCString())).format()

                LSA.push({ x: date, y: lsA})
                LSB.push({ x: date, y: lsB})
                CLOUD.push({ x: date, lsA:lsA, lsB: lsB})
            }
        }

    }


    console.log(LAG)
    console.log(LSA)

    const output = {
        CL: CL,
        BL: BL,
        LSA: LSA,
        LSB: LSB,
        LAG: LAG,
        CLOUD: CLOUD
    }

    return output

}


export default ichimoku

import bollingerBands from "./Trends/bollingerBands";
import movingAverages from "./Trends/movingAverages";
import macd from "./Oscilators/macd";
import rsi from "./Oscilators/rsi";
import parabolicSar from "./Trends/parabolicSar";
import ichimoku from "./Trends/ichimoku";
import atr from "./Oscilators/atr";


const findIndicator = (data, indicator) => {

    const range = data?.length - indicator?.period;

    switch (indicator.type) {
        case 'MA':
            return movingAverages(data, indicator).splice(indicator.period, range);
        case 'BB':
            return bollingerBands(data, indicator).splice(indicator.period, range);
        case 'PAR':
            console.log(parabolicSar(data, indicator))
            return parabolicSar(data, indicator)//.splice(indicator.period, range);
        case 'ICK':
            return ichimoku(data, indicator)//.splice(indicator.period, range);
        case 'RSI':
            return rsi(data, indicator)//.splice(indicator.period, range);
        case 'ATR':
                return atr(data, indicator)//.splice(indicator.period, range);
        case 'MACD':
            return macd(data, indicator)//.splice(indicator.period, range);
        default:
            console.log('Invalid Indicator')

    }

}

export default findIndicator
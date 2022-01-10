import bollingerBands from "./bollingerBands";
import movingAverages from "./movingAverages";
import macd from "./Oscilators/macd";
import rsi from "./Oscilators/rsi";


const findIndicator = (data, indicator) => {

    const range = data.length - indicator.period;

    switch (indicator.type) {
        case 'MA':
            return movingAverages(data, indicator).splice(indicator.period, range);
        case 'BB':
            return bollingerBands(data, indicator).splice(indicator.period, range);
        case 'RSI':
            return rsi(data, indicator)//.splice(indicator.period, range);
        case 'MACD':
            return macd(data, indicator)//.splice(indicator.period, range);
        default:
            console.log('Invalid Indicator')

    }

}

export default findIndicator
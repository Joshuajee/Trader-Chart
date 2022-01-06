import bollingerBands from "./bollingerBands";
import movingAverages from "./movingAverages";


const findIndicator = (data, indicator) => {

    const range = data.length - indicator.period;

    switch (indicator.type) {
        case 'MA':
            return movingAverages(data, indicator).splice(indicator.period, range);
        case 'BB':
            return bollingerBands(data, indicator).splice(indicator.period, range);
        case 'LNW':
            return movingAverages(data, indicator);
        default:
            console.log('Invalid Indicator')

    }

}

export default findIndicator
const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

const movingAverages = (data, indicator) => {

    switch (indicator.method) {
        case 'SMA':
            return sma(data, indicator);
        case 'EMA':
            return ema(data, indicator);
        case 'LNW':
            return lnw(data, indicator);
        default:
            console.log('invalid method')

    }

}


const sma = (data, indicator) => {

    return data.map((current, index) => {

        if (index  >= indicator.period) {

            const points = data.slice(index - indicator.period, index)

            const avg = average(points.map(point => choosePrice(indicator.applyTo, point)))

            return { x: points[indicator.period - 1]?.timestamp, y: avg }

        }

        return { x: current?.timestamp, y: current.values.close }
    })

}

const ema = (data, indicator) => {

    const _ema = (points, index) => {

        const k =  2 / (indicator.period - index + 1);

        if (indicator.period === index + 1) return choosePrice(indicator.applyTo, points[indicator.period - index - 1]) * k

        return choosePrice(indicator.applyTo, points[indicator.period - index - 1]) * k + _ema(points, index + 1) * (1 - k);

    }

    return data.map((current, index) => {

        if (index  >= indicator.period) {

            const points = data.slice(index - indicator.period, index)

            let result  = 0

            result += _ema(points, 0)

            return { x: current?.timestamp, y: result }

        }

        return { x: current?.timestamp, y: current.values.close }
    })

}

const lnw = (data, indicator) => {

    const _lnw = (points) => {

        let result = 0
        let count = indicator.period

        points.forEach(point => {
            result += count * choosePrice(indicator.applyTo, point)
            count--
        });

        return (result / (indicator.period * (indicator.period + 1) / 2 ))

    }

    return data.map((current, index) => {

        if (index  >= indicator.period) {

            const points = data.slice(index - indicator.period, index)

            return { x: current?.timestamp, y: _lnw(points) }

        }

        return { x: current?.timestamp, y: current.close }
    })

}

const choosePrice = (applyTo, data) => {
    switch (applyTo) {
        case 'open':
            return data.values.open;
        case 'high':
            return data.values.high;
        case 'low':
            return data.values.low;
        case 'close':
            return data.values.close;
        case 'median':
            return (data.values.high + data.values.low) / 2;
        case 'typical':
            return (data.values.high + data.values.low + data.values.close) / 3;
        case 'weighted':
            return (data.values.high + data.values.low + data.values.close * 2) / 4;;
        default:
            console.log('invalid application')

    }
}


export default movingAverages

export {
    sma,
    choosePrice
}
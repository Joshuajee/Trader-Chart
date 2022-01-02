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

            return { x: points[indicator.period - 1]?.x, y: avg }

        }

        return { x: current?.x, y: current.close }
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

            return { x: points[indicator.period - 1]?.x, y: result }

        }

        return { x: current?.x, y: current.close }
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


            return { x: points[indicator.period - 1]?.x, y: _lnw(points) }

        }

        return { x: current?.x, y: current.close }
    })

}

const choosePrice = (applyTo, data) => {
    switch (applyTo) {
        case 'open':
            return data.open;
        case 'high':
            return data.high;
        case 'low':
            return data.low;
        case 'close':
            return data.close;
        case 'median':
            return (data.high + data.low) / 2;
        case 'typical':
            return (data.high + data.low + data.close) / 3;
        case 'weighted':
            return (data.high + data.low + data.close * 2) / 4;;
        default:
            console.log('invalid application')

    }
}

























export default movingAverages
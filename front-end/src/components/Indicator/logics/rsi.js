import { choosePrice } from "./movingAverages"


const rsi = (data, indicator) => {

    const rs = (avgUp, avgDown) => {
        if (avgDown === 0) return 0
        return avgUp / avgDown
    }

    const priceData = data.map((current, index) => {

        if (index  >= indicator.period) {

            const points = data.slice(index - indicator.period, index)

            const x = points[indicator.period - 1]?.timestamp

            let up = 0;
            let down = 0;
            let close = choosePrice(indicator.applyTo, points[0])

            for (let i = 1; i < points.length; i++) {

                const close1 = choosePrice(indicator.applyTo, points[i])

                const diff = close1 - close;

                close = close1

                if (diff > 0) up += diff
                else down += Math.abs(diff)
        
            }

            const avgUp = up / indicator.period
            const avgDown = down / indicator.period

            const rsi = 100 - (100 / (1 + rs(avgUp, avgDown)))

            return { x: x, y: Number(rsi.toFixed(2)) }

        }

        return { x: current?.timestamp, y: 0 }
    })

    return priceData

}


export default rsi
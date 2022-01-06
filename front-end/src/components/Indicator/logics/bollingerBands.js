import { std } from "mathjs"
import { choosePrice, sma } from "./movingAverages"


const bollingerBands = (data, indicator) => {
    
    const MA = sma(data, indicator)

    const priceData = data.map((current, index) => {

        if (index  >= indicator.period) {

            const points = data.slice(index - indicator.period, index)

            const x = points[indicator.period - 1]?.timestamp

            const sigma = std(points.map(point => choosePrice(indicator.applyTo, point)))

            const ma = MA[index].y 
            const ub = MA[index].y + 2 * sigma
            const lb = MA[index].y - 2 * sigma

            return { x: x, ub: ub, ma: ma, lb: lb }

        }

        return { x: current?.timestamp, ub: 0, ma: 0, lb: 0 }
    })

    return priceData

}


export default bollingerBands
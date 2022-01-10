import MACD from "./MACD";
import RSI from "./RSI";

const NewWindow = (props) => {

    const { indicators, symbol, data, findIndicator, width, windowHeight, minX, maxX,
        onDomainChange, rsiAxis, noOfWindows, zoom, yTicks
    } = props


    if(!indicators[symbol]?.length) return <></>

    return ( 

        indicators[symbol]?.map(item => {

            if (item.type === 'RSI') {

                const points = findIndicator(data, item)

                return <RSI data={data} width={width} windowHeight={windowHeight} 
                            minX={minX} maxX={maxX} item={item} points={points}
                            onDomainChange={onDomainChange} rsiAxis={rsiAxis} 
                            noOfWindows={noOfWindows} zoom={zoom} yTicks={yTicks} />

            }

            if (item.type === 'MACD') {

                const points = findIndicator(data, item)

                return <MACD data={data} width={width} windowHeight={windowHeight} 
                            minX={minX} maxX={maxX} item={item} points={points}
                            onDomainChange={onDomainChange} 
                            noOfWindows={noOfWindows} zoom={zoom} yTicks={yTicks} />

                }

            return <></>

        }

    )

    )
}

export default NewWindow
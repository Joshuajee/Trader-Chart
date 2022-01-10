import { useState, useEffect } from "react";
import { VictoryChart, VictoryZoomContainer, VictoryAxis, VictoryLine, VictoryBar  } from "victory";
import { xAxisStyles, xAxisTicks } from "../../Charts/logics/xAxis";


const MACD = (props) => {

    const { points, windowHeight, minX, maxX, item,
        onDomainChange, noOfWindows, width, zoom
    } = props

    const [maxHigh, setMaxHigh] = useState(100)
	const [minLow, setMinLow] = useState(0)
    const [high, setHigh] = useState([])
	const [low, setLow] = useState([])
    const [yTicks, setYTicks] = useState([])

    useEffect(() => {

		if(points) {
			setHigh(points?.map(item => item.macdLine))
			setLow(points?.map(item => item.macdLine))
		}

	}, [points])

	useEffect(() => {

		const max = maxHigh;
		const min = minLow;

		const interval = 10 ** -5;

		let array = []

		for (let i = min; i < max; i += interval) {
			array.push(Number(i.toFixed(9)))
		}

		setYTicks(array)

	}, [maxHigh, minLow])


    useEffect(() => {

		const highRange = high.slice(minX, maxX)
		const lowRange = low.slice(minX, maxX)

		const max = Math.max(...highRange)
		const min = Math.min(...lowRange)
		const margin = max - min

		setMaxHigh(max + (margin * 0.06))
		setMinLow(min - (margin * 0.06))

	}, [minX, maxX, high, low])


    console.log(yTicks)

    return (
        <VictoryChart
            width={width}
            height={windowHeight}
            domain={{ x: [minX, maxX], y: [minLow, maxHigh]}}
            padding={{right: 60, bottom: 30, left: 0 }}
            containerComponent={
                <VictoryZoomContainer 
                    zoomDomain={{ x: [minX, maxX], y: [minLow, maxHigh] }}
                    onZoomDomainChange={onDomainChange}
                    />
                }
            scale={{x: "time"}}
            key={item.id}>
{/*}
              <VictoryBar
                style={{
                points: {
                    fill: "#c43a31",
                    width: 4
                }
                }}
                points={points}
                x='x'
                y='macdHist'
            />
            {*/}
            <VictoryLine 
                style={{
                    points: { stroke: item.color },
                    parent: { border: item.lineWidth}
                }}
                points={points}
                x='x'
                y='macdLine'	
                />

            <VictoryAxis 
                dependentAxis 
                orientation="right" 
                tickValues={yTicks} 
                tickFormat={(t, i) => { 
                    switch (i) {
                        case 0:
                            return t
                        case yTicks.length - 1:
                            return t
                        default:
                            return ''
                    }
                }}
                style={{
                    axis: {stroke: "#756f6a"},
                    axisLabel: {fontSize: 20, padding: 30},
                    ticks: {stroke: "grey", size: 5},
                    tickLabels: {fontSize: 12, padding: 5 }
                  }}
                />

            <VictoryAxis
                tickValues={points?.x}
                //style={xAxisStyles(maxX - minX)}
                tickFormat={(t, i) => xAxisTicks(t, i, noOfWindows, width, zoom)}
                />
 
        </VictoryChart>
        )
}


export default MACD
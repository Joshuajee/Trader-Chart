import { useEffect, useState } from "react";
import { VictoryChart, VictoryZoomContainer, VictoryAxis, VictoryLine, VictoryLegend } from "victory";
import { xAxisStyles, xAxisTicks } from "../../Charts/logics/xAxis";


const ATR = (props) => {

    const { data, width, windowHeight, minX, maxX, item, points,
        onDomainChange, noOfWindows, zoom
    } = props
    
    const [maxHigh, setMaxHigh] = useState(0.0000001)
	const [minLow, setMinLow] = useState(-0.0000001)
    const [high, setHigh] = useState(null)
	const [low, setLow] = useState(null)
    const [yTicks, setYTicks] = useState([])
 
    useEffect(() => {

        const yRange = points.slice(minX, maxX)

        const value = yRange.map(element => element.atr)

		setHigh(Math.max(...value))
		setLow(Math.min(...value))

    }, [points, minX, maxX])

    useEffect(() => {

        if (high && low) {

            const max = high;
            const min = low;

            const interval = (max - min) / 100;

            let array = []

            for (let i = min; i < max; i += interval) {
                array.push(Number(i.toFixed(8)))
            }

            setYTicks(array)
        }

	}, [high, low])

    useEffect(() => {

        const margin = high - low

        setMaxHigh(high + (margin * 0.06))
        setMinLow(low - (margin * 0.06))

    }, [high, low])

    return (
        <VictoryChart
            width={width}
            height={windowHeight}
            domain={{ x: [minX, maxX], y: [minLow, maxHigh]
            }}
            padding={{right: 60, bottom: 30, left: 0 }}
            containerComponent={
                <VictoryZoomContainer 
                    zoomDomain={{ x: [minX, maxX], y: [minLow, maxHigh]
                    }}
                    onZoomDomainChange={onDomainChange}
                    />}
            scale={{x: "time"}}
            key={item.id}>

            <VictoryLine 
                style={{
                    data: { stroke: item.color },
                    parent: { border: item.lineWidth}
                }}
                data={points}
                x='x'
                y='atr'	
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
                    grid: {stroke: ({ tick }) => {
                        if (tick === item.upperLevel || tick === item.lowerLevel) return "grey"
                    }},
                    ticks: {stroke: "grey", size: 5},
                    tickLabels: {fontSize: 12, padding: 5 }
                  }}
                />

            <VictoryAxis
                tickValues={data?.x}
                style={xAxisStyles(maxX - minX)}
                tickFormat={(t, i) => xAxisTicks(t, i, noOfWindows, width, zoom)}
            />

           <VictoryLegend x={12} y={10}
                title={`ATR(${item.period}) ${points[points.length - 1].atr}`}
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={ {title: {fontSize: 10 } }}
                data={[]}
                />

        </VictoryChart>
        )
}


export default ATR
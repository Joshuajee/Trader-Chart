import { VictoryChart, VictoryZoomContainer, VictoryAxis, VictoryLine, VictoryLegend  } from "victory";
import { xAxisStyles, xAxisTicks } from "../../Charts/logics/xAxis";


const RSI = (props) => {

    const { data, width, windowHeight, minX, maxX, item, points,
        onDomainChange, rsiAxis, noOfWindows, zoom
    } = props

    return (
        <VictoryChart
            width={width}
            height={windowHeight}
            domain={{ x: [minX, maxX], y: [0, 100]}}
            padding={{right: 60, bottom: 30, left: 0 }}
            containerComponent={
                <VictoryZoomContainer 
                    zoomDomain={{ x: [minX, maxX], y: [0, 100]}}
                    onZoomDomainChange={onDomainChange}
                    />
                }
            scale={{x: "time"}}
            key={item.id}>

            <VictoryLine 
                style={{
                    data: { stroke: item.color },
                    parent: { border: item.lineWidth}
                }}
                data={points}
                x='x'
                y='y'	
                //key={item.id}
                />

            <VictoryAxis 
                dependentAxis 
                orientation="right" 
                tickValues={rsiAxis} 
                tickFormat={(t, i) => { 
                    switch (i) {
                        case 0:
                            return t
                        case 100:
                            return t
                        case item.upperLevel:
                            return t
                        case item.lowerLevel:
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
						title={`RSI(${item.period}) ${points[points.length - 1].y}`}
						centerTitle
						orientation="horizontal"
						gutter={20}
						style={ {title: {fontSize: 10 } }}
						data={[]}
						/>


        </VictoryChart>
        )
}


export default RSI
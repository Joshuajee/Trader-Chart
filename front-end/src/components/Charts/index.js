import axios from 'axios';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { VictoryChart, VictoryZoomContainer, VictoryAxis, VictoryArea,
	VictoryCandlestick, VictoryLine, VictoryTooltip, VictoryLegend } from "victory";
import ToolBar from "./ToolBar";
import { updateAssets, addIndicator, updateIndicator  } from './../../redux/actions';
import {  domainController, zoomController, zoomIn, zoomOut } from "./logics/zoom";
import { xAxisStyles, xAxisTicks } from "./logics/xAxis";
import Modal from "../Indicator/Modal";
import findIndicator from "../Indicator/logics/indicator";
import { VictoryGroup } from "victory";
import { yAxisStyles, yAxisTicks } from "./logics/yAxis";
import { labels } from "./logics/candleChart";
import NewWindow from '../Indicator/Oscilators';


const mapStateToProps = state => {
    return { 
      assets: state.assets,
	  indicators: state.indicators
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        updateAssets: assets => dispatch(updateAssets(assets)),
		addIndicator: indicators => dispatch(addIndicator(indicators)),
		updateIndicator: indicators => dispatch(updateIndicator(indicators)),
    };
}


const padding = 0.06;

const toolStateObj = {
	zoomIn: true,
	zoomOut: true,
	hLine: false,
	vLine: false
}


const Chart = (props) => {

	const { updateAssets, assets, indicators } = props;

	console.log(window.innerHeight)

	const [width, ] = useState(window.innerWidth * 0.94)
	const [heightPadder, ] = useState(0.76)
	const [data, setData] = useState(null)
	const [start, setStart] = useState(0)
	const [count] = useState(500)
	const [symbol, setSymbol] = useState('EURUSD')
	const [tf, setTf] = useState('M1')
	const [zoom, setZoom] = useState(50)
	const [minX, setMinX] = useState(0)
	const [maxX, setMaxX] = useState(zoom)
	const [candleRatio, setCandleRatio] = useState(20 - zoom / 10)
	const [maxHigh, setMaxHigh] = useState(0)
	const [minLow, setMinLow] = useState(100)
	const [toolState, setToolState] = useState(toolStateObj)
	const [modal, setModal] = useState(false)
	const [high, setHigh] = useState([])
	const [low, setLow] = useState([])
	const [loading, setLoading] = useState(false)
	const [initialHeight, ] = useState(window.innerHeight * heightPadder);
	const [height, setHeight] = useState(initialHeight)
	const [windowHeight, setWindowHeight] = useState(0)
	const [noOfWindows, setNoOfWindows] = useState(0)
	const [yTicks, setYTicks] = useState([])
	const [rsiAxis,] = useState([...Array(101).keys()])


	useEffect(() => {

		setHeight(window.innerHeight * heightPadder)

	}, [heightPadder])

	useEffect(() => {

		if(data) {
			setHigh(data?.map(item => item.values.high))
			setLow(data?.map(item => item.values.low))
		}

	}, [data])


	useEffect(() => {

		const max = maxHigh;
		const min = minLow;

		const interval = 10 ** -5;

		let array = []

		for (let i = min; i < max; i += interval) {
			array.push(Number(i.toFixed(5)))
		}

		setYTicks(array)

	}, [maxHigh, minLow])


	useEffect(() => {

		const highRange = high.slice(minX, maxX)
		const lowRange = low.slice(minX, maxX)

		const max = Math.max(...highRange)
		const min = Math.min(...lowRange)
		const margin = max - min

		setMaxHigh(max + (margin * padding))
		setMinLow(min - (margin * padding))

	}, [minX, maxX, high, low])

	useEffect(() => {

		const count = data ? (data?.length / 50 ) : 20
		setMinX(maxX - zoom)

		const zoomRatio = 150 / zoom

		setCandleRatio(zoomRatio * count / 5)

	}, [minX, maxX, zoom, data])


	useEffect(() => zoomController(zoom, setToolState), [zoom])

	const onDomainChange = domain => {

		setMinX(Math.ceil(domain.x[0]))
		setMaxX(Math.ceil(domain.x[1]))

		const minDomain = Math.ceil(domain.x[0]);

		if ((minDomain / count) < 0.3 && !loading && true) {
			setStart(data.length)
		}

	}



	useEffect(() => {

		setLoading(true)

		axios.get(process.env.REACT_APP_API + `assets/${symbol}/${tf}/${start}/${count}`).then( res => {

			if (res.data.status === 'success') {

				if (start === 0)
					updateAssets({ data: res.data.data, count: res.data.count, start: true })
				else updateAssets({ data: res.data.data, count: res.data.count, start: false })

			}

			setLoading(false)

		}, err => {

			setLoading(false)
		})
		
	}, [start, count, symbol, updateAssets, tf])

	useEffect(() => domainController(assets, symbol, zoom, count, start, setData, setMaxX, setMinX), [assets, symbol, zoom, count])

	useEffect(() => {

		const list = { RSI: '', ATR: '', MACD: '' }

		let count = 0

		indicators[symbol]?.forEach(element => {

			if (element.type in list) {
				count++
				setHeight(window.innerHeight * heightPadder * 0.7 ** count)
			}

		});

		setNoOfWindows(count)

	}, [indicators, symbol, heightPadder])

	useEffect(() => {

		setWindowHeight(Math.abs(initialHeight - height) / noOfWindows )

	}, [initialHeight, height, noOfWindows])

	
	return (
		<div>
			<ToolBar
				zoomIn={() => zoomIn(zoom, setZoom)}
				zoomOut={() => zoomOut(zoom, setZoom)}
				state={toolState}
				setModal={setModal}
				addIndicator={addIndicator}
				/>

			<div className="chart">

				<VictoryChart
					height={height}
					width={width}
					domain={{ x: [minX, maxX], y: [minLow, maxHigh]}}
					containerComponent={
						<VictoryZoomContainer 
							zoomDomain={{ x: [minX, maxX], y: [minLow, maxHigh]}}
							onZoomDomainChange={onDomainChange}
							/>
						}
					padding={{right: 64, bottom: 30, left: 0}}
				    domainPadding={{ x: 25 }}
					scale={{ x: "time" }}
					events={{
						onClick: (evt) => alert(`(${evt.clientX}, ${evt.clientY})`)
					  }}
					>

					<VictoryAxis
						tickValues={data?.x}
						style={xAxisStyles(maxX - minX)}
						tickFormat={(t, i) => xAxisTicks(t, i, noOfWindows, width, zoom)}
						/>
		
					<VictoryAxis 
						dependentAxis 
						orientation="right"  
						tickValues={yTicks}
						tickFormat={(t, i) => yAxisTicks(i, t, yTicks)}
						style={yAxisStyles(yTicks)}
						/>



					{data && 
						<VictoryCandlestick
							data={data} 
							x='timestamp' 
							open={['values', 'open']} high={['values', 'high']}
							low={['values', 'low']} close={['values', 'close']}
							candleColors={{ positive: "green", negative: "red" }}
							candleRatio={candleRatio}
							labelComponent={<VictoryTooltip dy={0} />}
							labels={({ datum }) => labels(datum)}
							/>

					}


					{

						indicators[symbol]?.map(item => {

							if (item.type === 'MA') {

								const points = findIndicator(data, item)

								return <VictoryLine 
										style={{
											data: { stroke: item.color },
											parent: { border: item.lineWidth }
										}}
										data={points}
										x='x'
										y='y'	
										key={item.id}
										/>
									}


							if (item.type === 'BB') {

								const points = findIndicator(data, item)

								return (
									<VictoryGroup key={item.id}>
										<VictoryLine 
											style={{
												data: { stroke: item.color },
												parent: { border: item.lineWidth}
											}}
											data={points}
											x='x'
											y='ub'	
											key={item.id}
											/>
										<VictoryLine 
											style={{
												data: { stroke: item.color },
												parent: { border: item.lineWidth}
											}}
											data={points}
											x='x'
											y='ma'	
											key={item.id}
											/>
										<VictoryLine 
											style={{
												data: { stroke: item.color },
												parent: { border: item.lineWidth}
											}}
											data={points}
											x='x'
											y='lb'	
											key={item.id}
											/>
									</VictoryGroup>
									)

								} else 	if (item.type === 'PAR') {

									const points = findIndicator(data, item)

								} else if (item.type === 'ICK') {

									const points = findIndicator(data, item)

									console.log(points)

									return (
										<VictoryGroup key={item.id}>

											<VictoryArea 
												style={{ data: { fill: "#c43a31", opacity: 0.5 } }}
												data={points.CLOUD} x='x' y='lsA' y0='lsB'
												 />

											<VictoryLine 
												style={{
													data: { stroke: item.color },
													parent: { border: item.lineWidth}
												}}
												data={points.CL}
												x='x'
												y='y'	
												/>
											<VictoryLine 
												style={{
													data: { stroke: item.color },
													parent: { border: item.lineWidth}
												}}
												data={points.BL}
												x='x'
												y='y'	
												/>
											<VictoryLine 
												style={{
													data: { stroke: item.color },
													parent: { border: item.lineWidth}
												}}
												data={points.LSA}
												x='x'
												y='y'	
												/>
											<VictoryLine 
												style={{
													data: { stroke: item.color },
													parent: { border: item.lineWidth}
												}}
												data={points.LSB}
												x='x'
												y='y'	
												/>
											<VictoryLine 
												style={{
													data: { stroke: item.color },
													parent: { border: item.lineWidth}
												}}
												data={points.LAG}
												x='x'
												y='y'	
												/>

										</VictoryGroup>
									)

								}

							return null
						})

					}

					<VictoryLegend x={12} y={10}
						title={`${symbol}: ${tf}`}
						centerTitle
						orientation="horizontal"
						gutter={20}
						style={ {title: {fontSize: 20 } }}
						data={[]}
						/>

				</VictoryChart>

				{ data && <NewWindow 
							indicators={indicators} symbol={symbol} data={data}
							findIndicator={findIndicator} width={width} windowHeight={windowHeight} 
							minX={minX} maxX={maxX} onDomainChange={onDomainChange} rsiAxis={rsiAxis} 
							noOfWindows={noOfWindows} zoom={zoom} yTicks={yTicks} />
				}



				{ modal && <Modal setModal={setModal} symbol={symbol} indicators={indicators} /> }

			</div>

		</div>
	)
}


export default connect(mapStateToProps, mapDispatchToProps) (Chart);
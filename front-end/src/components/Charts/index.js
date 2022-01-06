import moment from "moment";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { VictoryChart, VictoryZoomContainer, VictoryAxis,
	VictoryCandlestick, VictoryLine, VictoryTooltip } from "victory";
import ToolBar from "./ToolBar";
import { updateAssets, addIndicator  } from './../../redux/actions';
//import {  zoomIn, zoomOutLogic } from "./logics";
import Modal from "../Indicator/Modal";
import findIndicator from "../Indicator/logics/indicator";
import { VictoryGroup } from "victory";
//import MovingAverages from "../Indicator/Trend/MovingAverages";


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

	let height = window.screen.height;
	let width = window.screen.width;

	if (width > 600 ) {
		height = height * 0.8;
		width = width * 0.8;
	} else {
		height = height * 0.88;
		width = width * 0.96;
	}


	const [data, setData] = useState(null)
	const [start, setStart] = useState(0)
	const [count] = useState(500)
	const [symbol, setSymbol] = useState('EURUSD')
	const [zoom, setZoom] = useState(150)
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


	useEffect(() => {

		if(data) {
			setHigh(data?.map(item => item.values.high))
			setLow(data?.map(item => item.values.low))
		}

	}, [data])


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

	useEffect(() => {

		if (zoom >= 2000)
			setToolState({...toolState, zoomOut: false})
		else if (!toolState.zoomOut)
			setToolState({...toolState, zoomOut: true})

		if (zoom <= 50)
			setToolState({...toolState, zoomIn: false})
		else if (!toolState.zoomIn)
			setToolState({...toolState, zoomIn: true})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [zoom])

	const onDomainChange = domain => {

		setMinX(Math.ceil(domain.x[0]))
		setMaxX(Math.ceil(domain.x[1]))

		//console.log('Domain ', Math.ceil(domain.x[0]))

		const minDomain = Math.ceil(domain.x[0]);

		if ((minDomain / count) < 0.3 && !loading && true) {
			setStart(data.length)
		}

	}

	const zoomOut = (zoom, setZoom) => {

		if (zoom >= 2000)
			console.log('maximum zoom out')
		else if (zoom >= 1000)
				setZoom(Math.ceil(zoom + 400))
		else if (zoom >= 800)
				setZoom(Math.ceil(zoom + 200))
		else if (zoom >= 600)
				setZoom(Math.ceil(zoom + 200))
		else if (zoom >= 400)
				setZoom(Math.ceil(zoom + 100))
		else if (zoom >= 0)
				setZoom(Math.ceil(zoom + 50))
	
	}
	
	
	const zoomIn = (zoom, setZoom) => {

	
		if (zoom <= 50)
			console.log("maximum zoom in")
		else if (zoom <= 100)
				setZoom(Math.ceil(zoom - 50))
		else if (zoom <= 400)
				setZoom(Math.ceil(zoom - 100))
		else if (zoom <= 600)
				setZoom(Math.ceil(zoom - 200))
		else if (zoom <= 800)
				setZoom(Math.ceil(zoom - 200))
		else if (zoom > 1000)
				setZoom(Math.ceil(zoom - 400))
	
	}

	useEffect(() => {

		setLoading(true)

		axios.get(process.env.REACT_APP_API + `assets/${symbol}/M1/${start}/${count}`).then( res => {

			if (res.data.status === 'success') {

				if (start === 0)
					updateAssets({ data: res.data.data, count: res.data.count, start: true })
				else updateAssets({ data: res.data.data, count: res.data.count, start: false })

			}

			setLoading(false)

		}, err => {
			setLoading(false)
		})
		
	}, [start, count, symbol, updateAssets])

	useEffect(() => {

		if(assets[symbol] && start === 0) {

			const zoomPadding = Math.ceil(zoom / 3)

			setData(assets[symbol].data)

			setMaxX(assets[symbol].data.length + zoomPadding)

			setMinX(assets[symbol].data.length - (zoom + zoomPadding))
			
		} else if(assets[symbol]) {

			setData(assets[symbol].data)

			setMaxX(count + maxX)

			setMinX(count + minX)

		} 

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assets, symbol, zoom])

	
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
					domain={{ x: [minX, maxX]}}
					containerComponent={
						<VictoryZoomContainer 
							zoomDomain={{ x: [minX, maxX], y: [minLow, maxHigh]}}
							onZoomDomainChange={onDomainChange}
							/>
						}
					domainPadding={{ x: 25 }}
					scale={{ x: "time" }}
					
					>
					{data && 
						<VictoryCandlestick
							data={data} 
							x='timestamp' 
							open={['values', 'open']} high={['values', 'high']}
							low={['values', 'low']} close={['values', 'close']}
							candleColors={{ positive: "green", negative: "red" }}
							candleRatio={candleRatio}
							labelComponent={<VictoryTooltip dy={0} />}
							labels={({ datum }) => {
								const t = datum.x
								const date = moment.utc(t).format("MMM Do YYYY")
								const time = moment.utc(t).format("h:mm")
								return (`
										open: ${datum.values.open} \n 
										high: ${datum.values.high} \n 
										low: ${datum.values.low} \n
										close: ${datum.values.close} \n
										date: ${date} \n
										time: ${time}
										`)
							}}
							/>

					}

					{

						indicators[symbol]?.map(item => {

							const points = findIndicator(data, item)

							if (item.type === 'MA')
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


							if (item.type === 'BB')
								return (
									<VictoryGroup>
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

							return null
						})

					}

				
						<VictoryAxis
							tickValues={data?.x}
							tickFormat={(t, i) => {

								const date = moment.utc(t).format("MMM Do, h:mm")

								if (width <= 500)						
									if (i % (zoom / 2 ) === 0) return `${date}`;
									else return '';

								if (width <= 600)						
									if (i % (zoom / 3 ) === 0) return `${date}`;
									else return '';

								if (i % (zoom / 5 ) === 0) return `${date}`;
								else return '';

							}
						}
						/>
		

					<VictoryAxis 
						dependentAxis 
						orientation="right"  
						/>

				</VictoryChart>

				{ modal && <Modal setModal={setModal} symbol={symbol} indicators={indicators} /> }

			</div>

		</div>
	)
}


export default connect(mapStateToProps, mapDispatchToProps) (Chart);
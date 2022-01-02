import moment from "moment";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryAxis,
	VictoryCandlestick, VictoryLine, VictoryTooltip, LineSegment } from "victory";
import ToolBar from "./ToolBar";
import { updateAssets  } from './../../redux/actions';
//import {  zoomIn, zoomOutLogic } from "./logics";
import Modal from "../Indicator/Modal";
import movingAverages from "../Indicator/logics/movingAverages";
import { pad } from "lodash";

const mapStateToProps = state => {
    return { 
      assets: state.assets
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        updateAssets: assets => dispatch(updateAssets(assets)),
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

	const { updateAssets, assets } = props;

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

	const [symbol, setSymbol] = useState('EURUSD')
	const [zoom, setZoom] = useState(150)
	const [minX, setMinX] = useState(0)
	const [maxX, setMaxX] = useState(zoom)
	const [candleRatio, setCandleRatio] = useState(20 - zoom / 10)
	const [maxHigh, setMaxHigh] = useState(0)
	const [minLow, setMinLow] = useState(100)
	const [toolState, setToolState] = useState(toolStateObj)
	const [modal, setModal] = useState(false)
	const [indicator, addIndicator] = useState([])


	useEffect(() => {

		if(data) {
			const high = Math.max(...data?.slice(minX, maxX).map(item => item.values.high))
			const low = Math.min(...data?.slice(minX, maxX).map(item => item.values.low))
			const margin = high - low

			setMaxHigh(high + (margin * padding))
			setMinLow(low - (margin * padding))
		}

	}, [minX, maxX, data])
	
	useEffect(() => {

		const count = data ? (data?.length / 50 ) : 20
		setMinX(maxX - zoom)
		setCandleRatio(count - (zoom / 20))

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

	}, [zoom])

	const onDomainChange = domain => {

		setMinX(Math.ceil(domain.x[0]))
		setMaxX(Math.ceil(domain.x[1]))

		console.log(Math.ceil(domain.x[0]))

		console.log(domain)
	
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

		axios.get(process.env.REACT_APP_API + 'assets/EURUSD/M1/0/500').then( res => {

			if (res.data.status === 'success') updateAssets({ data: res.data.data, count: res.data.count })

		}, err => {

		})
		
	}, [updateAssets])

	useEffect(() => {

		if(assets[symbol] && !data) {

			const zoomPadding = Math.ceil(zoom / 3)

			setData(assets[symbol].data)

			setMaxX(assets[symbol].data.length + zoomPadding)

			setMinX(assets[symbol].data.length - zoom + zoomPadding)
			
		} else if(assets[symbol]) setData(assets[symbol].data)

	}, [assets, symbol, zoom])

	console.log(" ---- ", assets[symbol]?.data)

	
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
							/*labels={({ datum }) => {
								const t = new Date(datum.x)
								const date = moment.utc(t).format("MMM Do YYYY")
								const time = moment.utc(t).format("h:mm")
								return (`
										open: ${datum.open} \n 
										high: ${datum.high} \n 
										low: ${datum.low} \n
										close: ${datum.close} \n
										date: ${date} \n
										time: ${time}
										`)
							}}*/
							/>

					}

					{

						indicator.map(item => {

							const points = movingAverages(data, item)

							console.log(item)
							console.log(points)


							return <VictoryLine 
										style={{
											data: { stroke: item.color },
											parent: { border: "1px solid #ccc"}
										}}
										data={points}
										x='x'
										y='y'	
										/>
						})
					}

					{ data &&
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
					}

					<VictoryAxis 
						dependentAxis 
						orientation="right"  
						/>

				</VictoryChart>

				{ modal && <Modal setModal={setModal} addIndicator={addIndicator} indicators={indicator} /> }

			</div>

		</div>
	)
}


export default connect(mapStateToProps, mapDispatchToProps) (Chart);
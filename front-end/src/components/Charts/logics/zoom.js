import { countDecimals } from "./functions"

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


        if (zoom <= 10)
                console.log("maximum zoom in")
        else if (zoom <= 50)
                setZoom(Math.ceil(zoom - 10))
        else if (zoom <= 100)
                        setZoom(Math.ceil(zoom - 20))
        else if (zoom <= 400)
                        setZoom(Math.ceil(zoom - 100))
        else if (zoom <= 600)
                        setZoom(Math.ceil(zoom - 200))
        else if (zoom <= 800)
                        setZoom(Math.ceil(zoom - 200))
        else if (zoom > 1000)
                        setZoom(Math.ceil(zoom - 400))

}

const zoomController = (zoom, setToolState) => {

        if (zoom >= 2000)
        setToolState(ts => { ts.zoomOut = false; return ts; })
        else 
        setToolState(ts => { ts.zoomOut = true; return ts; })

        if (zoom <= 10)
        setToolState(ts => { ts.zoomIn = false; return ts; })
        else 
        setToolState(ts => { ts.zoomIn = true; return ts; })

}


const domainController = (assets, symbol, zoom, count, start, setData, setMaxX, setMinX, setPoints) => {

        if(assets[symbol] && start === 0) {

                const zoomPadding = Math.ceil(zoom / 3)

                setData(assets[symbol].data)

                setMaxX(assets[symbol].data.length + zoomPadding)

                setMinX(assets[symbol].data.length - (zoom + zoomPadding))

                setPoints(countDecimals(assets[symbol].data[0]?.values?.high))
                
        } else if(assets[symbol]) {

                setData(assets[symbol].data)

                setMaxX(x => x + count)

                setMinX(x => x + count)

        } 

}

export {
    zoomIn,
    zoomOut,
    zoomController,
    domainController
}
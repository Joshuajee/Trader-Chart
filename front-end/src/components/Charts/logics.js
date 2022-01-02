const zoomOutLogic = (zoom, setZoom) => {

    if (zoom >= 2000)
        console.log('maximum zoom')
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

    if (zoom >= 2000)
        console.log("NO")
    else if (zoom >= 1000)
            setZoom(Math.ceil(zoom + 400))
    else if (zoom >= 800)
            setZoom(Math.ceil(zoom + 200))
    else if (zoom >= 600)
            setZoom(Math.ceil(zoom + 200))
    else if (zoom >= 400)
            setZoom(Math.ceil(zoom + 100))
    else if (zoom <= 100)
            setZoom(Math.ceil(zoom + 50))

}



exports = {
    zoomIn,
    zoomOutLogic,
}
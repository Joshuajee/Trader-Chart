import moment from "moment"

const xAxisStyles = (ticks) => {

    return {
        axis: {stroke: "#756f6a"},
        axisLabel: {fontSize: 20, padding: 30},
        grid: {stroke: ({index}) => {     
            const spacing = Math.round(ticks * 0.05)

            if (index % spacing === 0 ) return 'grey'
            else return ''
        }},
        ticks: {stroke: "grey", size: 5},
        tickLabels: {fontSize: 15, padding: 5}
    }
}


const xAxisTicks = (t, i, noOfWindows, width, zoom) => {

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


export {
    xAxisStyles,
    xAxisTicks
}
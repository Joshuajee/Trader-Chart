const TICKS_PERCENT = 0.15

const yAxisStyles = (yTicks) => {

    return {
        axis: {stroke: "#756f6a"},
        axisLabel: {fontSize: 20, padding: 30},
        grid: {stroke: ({ index}) => {

            const spacing = Math.round(yTicks.length * TICKS_PERCENT)

            if (index % spacing === 0 && index !== 0 ) return 'grey'
            else return ''

        }},
        ticks: {stroke: "grey", size: 5},
        tickLabels: {fontSize: 15, padding: 5}
    }
}


const yAxisTicks = (i, t, yTicks) => { 

    const spacing = Math.round(yTicks.length * TICKS_PERCENT)

    if (i % spacing === 0  && i !== 0) return t
    else return ''

}

const yIndicatorFont = () => {
    
}



export {
    yAxisStyles,
    yAxisTicks
}
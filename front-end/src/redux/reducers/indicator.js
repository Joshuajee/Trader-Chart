const indicatorReducer = (state, payload) => {

    const symbol = payload?.symbol
    
    const indicator = payload?.indicator

    const indicators = {...state.indicators}
    const indArray = indicators[symbol]

    if (!indArray) {
        indicator.id = symbol + '_1'
        indicators[symbol] = [indicator]
    } else {
        indicator.id = symbol + '_' + Number(indArray.length + 1)
        indicators[symbol] = [...indArray, indicator]
    }

    return indicators
}

const updateIndicator = (state, payload) => {

    const symbol = payload?.metadata?.symbol
    const indicator = payload?.indicator
    const instruction = payload?.instruction

    const indicators = {...state.indicators}
    const indArray = indicators[symbol]

    const array = []

    indArray.forEach(element => {

        if (element.id === indicator.id) {

            if (instruction === 'edit')
                array.push(indicator)
            else if (instruction === 'delete') {} //array.push(indicator)

        } else {
            array.push(element)
        }
        
    });

    indicators[symbol] = array

    return indicators
}


export default indicatorReducer

export {
    updateIndicator
}
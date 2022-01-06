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


export default indicatorReducer
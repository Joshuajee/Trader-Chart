const getName = name => {

    switch(name) {
        case 'MA':
            return 'Moving Averages'
        case 'BB':
            return 'Bollinger Band'
        case 'RSI':
            return 'Relative Strength Index'
        default:
            return 'Indicators'
    }
}



export {
    getName
}

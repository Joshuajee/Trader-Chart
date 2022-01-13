
    const getName = name => {

        switch(name) {
            case 'MA':
                return 'Moving Averages'
            case 'BB':
                return 'Bollinger Band'
            case 'ICK':
                return 'Ichimoku'
            case 'PAR':
                return 'Parabolic Sar'
            case 'MACD':
                return 'Moving Average Convergence Divergence'
            case 'RSI':
                return 'Relative Strength Index'
            case 'ATR':
                return 'Average True Range'
            default:
                return 'Indicator'
        }
    }


export {
    getName
}

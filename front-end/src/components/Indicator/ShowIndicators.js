import React, { useEffect } from "react"


const ShowIndicators = (props) => {

    const { indicators, symbol, chooseIndicator, setUpdate } = props

    useEffect(() => {
        if (indicators[symbol]?.length > 0) chooseIndicator('update') 
        else chooseIndicator('add')
    }, [indicators, symbol, chooseIndicator])

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
                return ''
        }
    }

    return (
            <div className="container">

                <button onClick={() => chooseIndicator('add')}>Add Indicator</button>

                <ul>
                    {indicators[symbol].map(indicator => {
                        return <li onClick={() => setUpdate(indicator)}> {getName(indicator.type)} </li>
                    })}
                </ul>

            </div>
            )

}

export default ShowIndicators


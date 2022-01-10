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
            case 'RSI':
                return 'Relative Strength Index'
            default:
                return ''
        }
    }

    return (
            <div className="container">

                <button onClick={() => chooseIndicator('add')}>Add Indicator</button>

                <ul>
                    {indicators[symbol].map(indicator => {
                        console.log(indicator)
                        return <li onClick={() => setUpdate(indicator)}> {getName(indicator.type)} </li>
                    })}
                </ul>

            </div>
            )

}

export default ShowIndicators


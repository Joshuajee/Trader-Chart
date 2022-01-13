import React, { useEffect } from "react"
import { getName } from "./logics/general"


const ShowIndicators = (props) => {

    const { indicators, symbol, chooseIndicator, setUpdate } = props

    useEffect(() => {
        if (indicators[symbol]?.length > 0) chooseIndicator('update') 
        else chooseIndicator('add')
    }, [indicators, symbol, chooseIndicator])

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


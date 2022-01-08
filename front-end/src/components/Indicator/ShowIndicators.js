


const ShowIndicators = (props) => {

    const { indicators, symbol, chooseIndicator } = props

    return (
            <div className="container">

                <button onClick={() => chooseIndicator('add')}>Add Indicator</button>

                <ul>
                    {indicators[symbol].map(indicator => {
                        return <li>{indicator.type}</li>
                    })}
                </ul>

            </div>
            )

}

export default ShowIndicators
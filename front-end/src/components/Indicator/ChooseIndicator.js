const ChooseIndicator = (props) => {

    const { chooseIndicator, indicators, symbol } = props

    return (
            <div className="container">

            { (indicators[symbol]?.length > 0) &&
                <button onClick={() => chooseIndicator('update')}>Edit/Delete Indicator</button>
            }

                <div>
                    <p>Trend </p>

                    <ul>
                        <li onClick={() => chooseIndicator("MA")}>Moving Average</li>
                        <li onClick={() => chooseIndicator("BB")}>Bollinger Band</li>
                    </ul>

                </div>

                
                <div>
                    <p>Oscilators </p>
                    
                    <ul>
                        <li onClick={() => chooseIndicator("RSI")}>Relative Strength Index (RSI)</li>
                        <li onClick={() => chooseIndicator("MACD")}>Moving Average Convergence Divergence (MACD)</li>
                    </ul>

                </div>


                <div></div>

            </div>
            )

}

export default ChooseIndicator
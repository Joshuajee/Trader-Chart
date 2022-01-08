const ChooseIndicator = (props) => {

    const { chooseIndicator } = props

    return (
            <div className="container">

                <button onClick={() => chooseIndicator('update')}>Edit/Delete Indicator</button>

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
                        <li onClick={() => chooseIndicator("RSI")}>Relative Strength Index (RSI)</li>
                    </ul>

                </div>


                <div></div>

            </div>
            )

}

export default ChooseIndicator
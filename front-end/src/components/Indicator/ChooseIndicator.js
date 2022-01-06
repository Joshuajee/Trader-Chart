const ChooseIndicator = (props) => {

    const { chooseIndicator } = props

    return (
            <div className="container">

                <div>
                    <p>Trend </p>

                    <ul>
                        <li onClick={() => chooseIndicator("MA")}>Moving Average</li>
                        <li onClick={() => chooseIndicator("BB")}>Bollinger Band</li>
                        <li onClick={() => chooseIndicator("MA")}>Moving Average</li>
                        <li onClick={() => chooseIndicator("BB")}>Bollinger Band</li>
                    </ul>

                </div>

                
                <div>
                    <p>Oscilators </p>
                    
                    <ul>
                        <li>Moving Average</li>
                        <li>Moving Average</li>
                        <li>Moving Average</li>
                        <li>Moving Average</li>
                    </ul>

                </div>


                <div></div>

            </div>
            )

}

export default ChooseIndicator
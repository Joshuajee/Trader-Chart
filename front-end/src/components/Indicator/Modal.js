import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IoIosClose } from "react-icons/io";
import ChooseIndicator from "./ChooseIndicator";
import MovingAverages from "./Modal/Trend/MovingAverages";
import { addIndicator  } from './../../redux/actions';
import BollingerBands from "./Modal/Trend/BollingerBands";

const mapStateToProps = state => {
    return { 
	  indicator: state.indicator
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
		addIndicator: indicators => dispatch(addIndicator(indicators)),
    };
}


const Modal = (props) => {

    const { setModal, addIndicator, indicators, symbol } = props

    const [title, setTitle] = useState("Indicators")
    const [indicator, chooseIndicator] = useState(null)


    useEffect(() => {
        switch (indicator) {
            case 'MA':
                setTitle('Moving Averages')
            break
            case 'BB':
                setTitle('Bollinger Bands')
            break
            default:
                setTitle('Indicators')
        }

    }, [indicator])


    return (
        <div className="modal">

            <div className="title"> {title}  <span className="close" onClick={() => setModal(false)}> <IoIosClose size={40}/> </span> </div>

            { !indicator && <ChooseIndicator chooseIndicator={chooseIndicator} /> }

            { indicator === "MA" &&
                <MovingAverages 
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    />
            }

            { indicator === "BB" &&
                <BollingerBands 
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    />
            }

        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps) (Modal)
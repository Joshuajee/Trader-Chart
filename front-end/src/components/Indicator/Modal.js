import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IoIosClose } from "react-icons/io";
import ChooseIndicator from "./ChooseIndicator";
import MovingAverages from "./Modal/Trend/MovingAverages";
import { addIndicator, deleteIndicator, updateIndicator  } from './../../redux/actions';
import BollingerBands from "./Modal/Trend/BollingerBands";
import RSI from "./Modal/Oscilators/RSI";
import ShowIndicators from "./ShowIndicators";
import { getName } from "./logics/general";
import MACD from "./Modal/Oscilators/MACD";
import ParabolicSar from "./Modal/Trend/ParabolicSar";
import Ichimoku from "./Modal/Trend/Ichimoku";
import ATR from "./Modal/Oscilators/ATR";


const mapStateToProps = state => {
    return { 
	  indicator: state.indicator
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
		addIndicator: indicators => dispatch(addIndicator(indicators)),
        updateIndicator: indicators => dispatch(updateIndicator(indicators)),
        deleteIndicator: indicators => dispatch(deleteIndicator(indicators))
    };
}


const Modal = (props) => {

    const { setModal, addIndicator, updateIndicator, deleteIndicator, indicators, symbol } = props

    const [title, setTitle] = useState("Indicators")
    const [indicator, chooseIndicator] = useState(null)
    const [update, setUpdate] = useState(null)


    useEffect(() => {

        setTitle(getName(indicator))

    }, [indicator])

    useEffect(() => {

        chooseIndicator(update?.type)

    }, [update])

    useEffect(() => {
        if (indicators[symbol]?.length > 0) chooseIndicator('update') 
        else chooseIndicator('add')
    }, [indicators, symbol])

    return (
        <div className="modal">

            <div className="close" onClick={() => setModal(false)}> <IoIosClose onClick={() => setModal(false)} size={40}/> </div>

            <div className="title"> {title}   </div>

            { indicator === 'update' && <ShowIndicators setUpdate={setUpdate} indicator={indicator} chooseIndicator={chooseIndicator} indicators={indicators} symbol={symbol} />}

            { indicator === 'add' && <ChooseIndicator indicators={indicators} indicator={indicator} chooseIndicator={chooseIndicator} /> }

            { indicator === "MA" &&
                <MovingAverages 
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    update={update}
                    deleteIndicator={deleteIndicator}
                    updateIndicator={updateIndicator}
                    />
            }

            { indicator === "BB" &&
                <BollingerBands 
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    update={update}
                    deleteIndicator={deleteIndicator}
                    updateIndicator={updateIndicator}
                    />
            }


            { indicator === "PAR" &&
                <ParabolicSar
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    update={update}
                    deleteIndicator={deleteIndicator}
                    updateIndicator={updateIndicator}
                    />
            }

            { indicator === "ICK" &&
                <Ichimoku
                    addIndicator={addIndicator}
                    indicators={indicators}
                    setModal={setModal}
                    symbol={symbol}
                    update={update}
                    deleteIndicator={deleteIndicator}
                    updateIndicator={updateIndicator}
                    />
            }

            {
                indicator === "RSI" &&
                    <RSI 
                        addIndicator={addIndicator}
                        indicators={indicators}
                        setModal={setModal}
                        symbol={symbol}
                        update={update}
                        deleteIndicator={deleteIndicator}
                        updateIndicator={updateIndicator}
                        />
            }

            {
                indicator === "ATR" &&
                    <ATR 
                        addIndicator={addIndicator}
                        indicators={indicators}
                        setModal={setModal}
                        symbol={symbol}
                        update={update}
                        deleteIndicator={deleteIndicator}
                        updateIndicator={updateIndicator}
                        />
            }

            {
                indicator === "MACD" &&
                    <MACD 
                        addIndicator={addIndicator}
                        indicators={indicators}
                        setModal={setModal}
                        symbol={symbol}
                        update={update}
                        deleteIndicator={deleteIndicator}
                        updateIndicator={updateIndicator}
                        />
            }

        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps) (Modal)
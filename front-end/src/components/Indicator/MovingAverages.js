import { useState } from "react";

const indicator = {
    type: 'MA',
    period: 10,
    color: '#3f0d16',
    method: 'SMA',
    applyTo: 'close',
    lineWidth: 1
}

const MovingAverages = (props) => {

    const { addIndicator, indicators, setModal } = props


    const [data, setData] = useState(indicator)


    return (
        <div className="modal">

            <div className="title">

                Moving Average

            </div>

            <div className="container">

                <div className="parameter"> Period: 
                
                    <input 
                        type={'text'} 
                        defaultValue={10}
                        onChange={(e) => setData({...data, period: e.target.value})} /> </div>

                <div className="parameter"> 

                    Methods: 
                        <select onChange={(e) => setData({...data, method: e.target.value})} > 
                            <option value={'SMA'}>Simple Moving Average </option> 
                            <option value={'EMA'}>Exponential Moving Average </option> 
                            {/*
                            <option value={'SMO'}>Smoothed Moving Average </option> 
                            */}
                            <option value={'LNW'}>Linear Weighted Moving Average </option> 
                        </select> 

                </div>

                <div className="parameter"> 

                    Apply to: 
                        <select onClick={(e) => setData({...data, applyTo: e.target.value})} > 
                            <option value={'close'}> Close </option> 
                            <option value={'open'}> Open </option> 
                            <option value={'high'}> High </option> 
                            <option value={'low'}> Low </option> 
                            <option value={'median'}> Median (HL/2) </option> 
                            <option value={'typical'}> Typical Price (HLC/3)</option> 
                            <option value={'weighted'}> Weighted Close (HLCC/4)</option> 
                        </select> 

                </div>

                <div className="parameter"> 

                   Color:  <input type="color" defaultValue={indicator.color} onChange={(e) => setData({ ...data, color: e.target.value }) }/>

                </div>

                <div className="parameter"> 

                    Line Width: 
                        <select> 
                            <option value={'close'}> Close </option> 
                            <option value={'open'}> Open </option> 
                            <option value={'high'}> High </option> 
                            <option value={'low'}> Low </option> 
                            <option value={'median'}> Median (HL/2) </option> 
                            <option value={'typical'}> Typical Price (HLC/3)</option> 
                            <option value={'weighted'}> Weighted Close (HLCC/4)</option> 
                        </select> 

                </div>

                <button onClick={() => { 
                    addIndicator([...indicators, data]); 
                    setModal(false); 
                }} > OK </button>

            </div>

        </div>
    )
}

export default MovingAverages
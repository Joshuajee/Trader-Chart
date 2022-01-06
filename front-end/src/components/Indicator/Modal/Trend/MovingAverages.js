import { useState } from "react";

const indicator = {
    type: 'MA',
    period: 10,
    color: '#3f0d16',
    method: 'SMA',
    applyTo: 'close',
    lineWidth: '1px'
}

const MovingAverages = (props) => {

    const { addIndicator, setModal, symbol } = props


    const [data, setData] = useState(indicator)


    return (
        <div className="container">

            <div className="parameter"> Period: 
            
                <input 
                    type={'text'} 
                    defaultValue={10}
                    onChange={(e) => setData({...data, period: e.target.value})} /> </div>

                <div className="parameter"> 

                    Method: 
                    <select onClick={(e) => setData({...data, method: e.target.value})} > 
                        <option value={'SMA'}> Simple Moving Average </option> 
                        <option value={'EMA'}>Exponetial Moving Average </option> 
                        <option value={'LNW'}> Linear Weighted Moving Average </option> 
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
                    <select onClick={(e) => setData({...data, lineWidth: e.target.value})}> 
                        <option value={'1px'}> 1px </option> 
                        <option value={'2px'}> 2px </option> 
                        <option value={'3px'}> 3px </option> 
                        <option value={'4px'}> 4px </option> 
                    </select> 

            </div>

            <button onClick={() => { 
                addIndicator({ indicator: data, symbol: symbol }); 
                setModal(false); 
            }} > OK </button>

        </div>
    )
}

export default MovingAverages
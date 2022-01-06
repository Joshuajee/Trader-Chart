import { useState } from "react";

const indicator = {
    type: 'BB',
    period: 20,
    deviation: 2.000,
    color: '#3f0d16',
    applyTo: 'close',
    lineWidth: '1px'
}

const BollingerBands = (props) => {

    const { addIndicator, symbol, setModal } = props
    const [data, setData] = useState(indicator)

    return (
        <div className="container">

            <div className="parameter"> Period: 
            
                <input 
                    type={'text'} 
                    defaultValue={10}
                    onChange={(e) => setData({...data, period: e.target.value})} /> 
            
            </div>

            <div className="parameter"> Deviation:

                <input 
                    type={'text'} 
                    defaultValue={2.000}
                    onChange={(e) => setData({...data, deviation: Number(e.target.value)})} />

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

export default BollingerBands
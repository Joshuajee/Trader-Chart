import { useState } from "react";
import Action from "../Utils/Action";
import  ApplyTo from "../Utils/ApplyTo";
import LineWidth from "../Utils/LineWidth";

const indicator = {
    type: 'MACD',
    fastEMA: 12,
    slowEMA: 26,
    macdSMA: 9,
    colorMain: 'gray',
    color: '#3f0d16',
    applyTo: 'close',
    lineWidth: '1px'
}

const MACD = (props) => {

    const { addIndicator, symbol, setModal, update, updateIndicator, deleteIndicator } = props
    const [data, setData] = useState(update? update : indicator)

    return (
        <div className="container">

            <div className="parameter"> Fast EMA: 
            
                <input 
                    type={'text'} 
                    defaultValue={data.fastEMA}
                    onChange={(e) => setData({...data, fastEMA: e.target.value})} /> 
            
            </div>

            <div className="parameter"> Slow EMA: 
                
                <input 
                    type={'text'} 
                    defaultValue={data.slowEMA}
                    onChange={(e) => setData({...data, slowEMA: e.target.value})} /> 
            
            </div>

            <div className="parameter"> MACD SMA: 
                
                <input 
                    type={'text'} 
                    defaultValue={data.macdSMA}
                    onChange={(e) => setData({...data, macdSMA: e.target.value})} /> 
            
            </div>

            <ApplyTo setData={setData} data={data} />

            <div className="parameter"> 

                Color:  <input type="color" defaultValue={indicator.color} onChange={(e) => setData({ ...data, color: e.target.value }) }/>

            </div>

            <LineWidth setData={setData} data={data} />

            <Action 
                updateIndicator={updateIndicator} 
                addIndicator={addIndicator} 
                deleteIndicator={deleteIndicator} 
                symbol={symbol} setModal={setModal} data={data}
                update={update} />

        </div>
    )
}

export default MACD
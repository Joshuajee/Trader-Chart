import { useState } from "react";
import Action from "../Utils/Action";
import  ApplyTo from "../Utils/ApplyTo";
import LineWidth from "../Utils/LineWidth";

const indicator = {
    type: 'RSI',
    period: 14,
    upperLevel: 70,
    lowerLevel: 30,
    color: '#3f0d16',
    applyTo: 'close',
    lineWidth: '1px'
}

const RSI = (props) => {

    const { addIndicator, symbol, setModal, update, updateIndicator, deleteIndicator } = props
    const [data, setData] = useState(update? update : indicator)

    return (
        <div className="container">

            <div className="parameter"> Period: 
            
                <input 
                    type={'text'} 
                    defaultValue={data.period}
                    onChange={(e) => setData({...data, period: e.target.value})} /> 
            
            </div>

            <div className="parameter"> Levels:

                <input 
                    type={'text'} 
                    defaultValue={70}
                    onChange={(e) => setData({...data, upperLevel: Number(e.target.value)})} />

                <input 
                    type={'text'} 
                    defaultValue={30}
                    onChange={(e) => setData({...data, lowerLevel: Number(e.target.value)})} />

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

export default RSI
import { useState } from "react";
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

    const { addIndicator, symbol, setModal } = props
    const [data, setData] = useState(indicator)

    return (
        <div className="container">

            <div className="parameter"> Period: 
            
                <input 
                    type={'text'} 
                    defaultValue={14}
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

            <button onClick={() => { 
                addIndicator({ indicator: data, symbol: symbol }); 
                setModal(false); 
            }} > OK </button>

        </div>
    )
}

export default RSI
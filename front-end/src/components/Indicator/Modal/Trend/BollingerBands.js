import { useState } from "react";
import ApplyTo from "../Utils/ApplyTo";
import LineWidth from "../Utils/LineWidth";

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
                    defaultValue={20}
                    onChange={(e) => setData({...data, period: e.target.value})} /> 
            
            </div>

            <div className="parameter"> Deviation:

                <input 
                    type={'text'} 
                    defaultValue={2.000}
                    onChange={(e) => setData({...data, deviation: Number(e.target.value)})} />

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

export default BollingerBands
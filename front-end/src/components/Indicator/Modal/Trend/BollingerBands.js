import { useState } from "react";
import Action from "../Utils/Action";
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

    const { addIndicator, updateIndicator, deleteIndicator, symbol, setModal, update } = props
    const [data, setData] = useState(update? update : indicator)

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


            <Action 
                updateIndicator={updateIndicator} 
                addIndicator={addIndicator} 
                deleteIndicator={deleteIndicator} 
                symbol={symbol} setModal={setModal} data={data}
                update={update} />

        </div>
    )
}

export default BollingerBands
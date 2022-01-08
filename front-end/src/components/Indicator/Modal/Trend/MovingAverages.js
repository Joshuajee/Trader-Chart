import { useState } from "react";
import ApplyTo from "../Utils/ApplyTo";
import LineWidth from "../Utils/LineWidth";

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

export default MovingAverages
import { useState } from "react";
import Action from "../Utils/Action";
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

    const { addIndicator, updateIndicator, deleteIndicator, setModal, symbol, update } = props

    const [data, setData] = useState(update? update : indicator)


    return (
        <div className="container">

            <div className="parameter"> Period: 
            
                <input 
                    type={'text'} 
                    defaultValue={data?.period}
                    onChange={(e) => setData({...data, period: e.target.value})} /> </div>

                <div className="parameter"> 

                    Method: 
                    <select onClick={(e) => setData({...data, method: e.target.value})} > 
                        <option selected={data?.method === 'SMA' ? 'selected' : ''} value={'SMA'}> Simple Moving Average </option> 
                        <option selected={data?.method === 'EMA' ? 'selected' : ''} value={'EMA'}>Exponetial Moving Average </option> 
                        <option selected={data?.method === 'LNW' ? 'selected' : ''} value={'LNW'}> Linear Weighted Moving Average </option> 
                    </select> 

                </div>


            <ApplyTo setData={setData} data={data}  />

            <div className="parameter"> 

                Color:  <input type="color" defaultValue={data.color} onChange={(e) => setData({ ...data, color: e.target.value }) }/>

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

export default MovingAverages
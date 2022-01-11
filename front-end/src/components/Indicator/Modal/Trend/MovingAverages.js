import { useState, useEffect } from "react";
import Action from "../Utils/Action";
import ApplyTo from "../Utils/ApplyTo";
import ColorPicker, { Color } from "../Utils/ColorPicker";
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
    const [color, setColor] = useState(data.color)
    const [pickColor, setPickColor] = useState(false)

    useEffect(() => {
        
        setData(x => { x.color = color; return x; })

    }, [color])
    

    return (
        <div className="container">

            { (pickColor) && <ColorPicker setPickColor={setPickColor} color={color} setColor={setColor} /> }

            {!pickColor &&
                <>
                
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

                    Color: 

                    <div className="color-picker" style={{width: 80}} onClick={() => setPickColor(true)} >
                        <Color color={data.color} width={'100%'} setColor={setColor} />
                    </div>
                </div>

                <LineWidth setData={setData} data={data} />

                <Action 
                    updateIndicator={updateIndicator} 
                    addIndicator={addIndicator} 
                    deleteIndicator={deleteIndicator} 
                    symbol={symbol} setModal={setModal} data={data}
                    update={update} />
                
                </>

            }

        </div>
    )
}

export default MovingAverages
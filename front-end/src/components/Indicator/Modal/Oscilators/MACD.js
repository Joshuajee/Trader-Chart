import { useState } from "react";
import Action from "../Utils/Action";
import  ApplyTo from "../Utils/ApplyTo";
import ColorPicker, { Color } from "../Utils/ColorPicker";
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
    const [color, setColor] = useState(data.color)
    const [pickColor, setPickColor] = useState(false)


    return (
        <div className="container">

        { (pickColor) && <ColorPicker setPickColor={setPickColor} color={color} setColor={setColor} /> }

        {!pickColor &&
            <>

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

                    Color: 

                    <div style={{width: 80}} className="color-picker" onClick={() => setPickColor(true)} >
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

export default MACD
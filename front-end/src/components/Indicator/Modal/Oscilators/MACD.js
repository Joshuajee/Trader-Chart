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
    const [pickColor, setPickColor] = useState(false)


    return (
        <div className="container">

        { (pickColor) && <ColorPicker data={data} setData={setData} field={'color'} setPickColor={setPickColor} /> }


        {!pickColor &&
            <>

                <div className="parameter"> Fast EMA: 
                
                    <input 
                        type={'number'} 
                        defaultValue={data.fastEMA}
                        onChange={(e) => setData({...data, fastEMA: Number(e.target.value)})} /> 
                
                </div>

                <div className="parameter"> Slow EMA: 
                    
                    <input 
                        type={'number'}  
                        defaultValue={data.slowEMA}
                        onChange={(e) => setData({...data, slowEMA: Number(e.target.value)})} /> 
                
                </div>

                <div className="parameter"> MACD SMA: 
                    
                    <input 
                        type={'number'} 
                        defaultValue={data.macdSMA}
                        onChange={(e) => setData({...data, macdSMA: Number(e.target.value)})} /> 
                
                </div>

                <ApplyTo setData={setData} data={data} />

                <div className="parameter"> 

                    Color: 

                    <div style={{width: 80}} className="color-picker" onClick={() => setPickColor(true)} >
                        <Color color={data.color} width={'100%'} />
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
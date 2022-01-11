import { useState, useEffect } from "react";
import Action from "../Utils/Action";
import ApplyTo from "../Utils/ApplyTo";
import ColorPicker, { Color } from "../Utils/ColorPicker";
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

export default BollingerBands
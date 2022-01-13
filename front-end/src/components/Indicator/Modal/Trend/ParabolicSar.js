import { useState, useEffect } from "react";
import Action from "../Utils/Action";
import ApplyTo from "../Utils/ApplyTo";
import ColorPicker, { Color } from "../Utils/ColorPicker";
import LineWidth from "../Utils/LineWidth";

const indicator = {
    type: 'PAR',
    step: 0.02,
    maximum: 0.2,
    color: '#3f0d16',
    lineWidth: '1px'
}

const ParabolicSar = (props) => {

    const { addIndicator, updateIndicator, deleteIndicator, symbol, setModal, update } = props
    const [data, setData] = useState(update? update : indicator)
    const [color, setColor] = useState(data.color)
    const [pickColor, setPickColor] = useState(false)


    return (
        <div className="container">

            { (pickColor) && <ColorPicker setPickColor={setPickColor} color={color} setColor={setColor} /> }


            {!pickColor &&
                <>
                    <div className="parameter"> Step:
                    
                        <input 
                            type={'text'} 
                            defaultValue={data.step}
                            onChange={(e) => setData({...data, step: e.target.value})} /> 
                    
                    </div>

                    <div className="parameter"> Maximum:

                        <input 
                            type={'text'} 
                            defaultValue={data.maximum}
                            onChange={(e) => setData({...data, maximum: Number(e.target.value)})} />

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

export default ParabolicSar
import { useState, useEffect } from "react";
import Action from "../Utils/Action";
import ColorPicker, { Color } from "../Utils/ColorPicker";
import Width from "../Utils/Width";

const indicator = {
    type: 'ICK',
    tenkanSen: 9,
    kijunSen: 26,
    senkou: 52,
    tenkanSenColor: '#03071e',
    kijunSenColor: '#370617',
    upKumoColor: '#ffba08',
    downKumoColor: '#3f0d16',
    chikouColor: '#d9ed92',
    tenkanSenWidth: '1px',
    kijunSenWidth: '1px',
    upKumoWidth: '1px',
    downKumoWidth: '1px',
    chikiouWidth: '1px',
}

const Ichimoku = (props) => {

    const { addIndicator, symbol, setModal, update, updateIndicator, deleteIndicator } = props
    const [data, setData] = useState(update? update : indicator)
    const [pickColor, setPickColor] = useState(false)
    const [color, setColor] = useState(data.tenkanSenColor)
    const [color1, setColor1] = useState(data.tenkanSenColor)
    const [color2, setColor2] = useState(data.kijunSenColor)
    const [color3, setColor3] = useState(data.upKumoColor)
    const [color4, setColor4] = useState(data.downKumoColor)
    const [color5, setColor5] = useState(data.chikouColor)

    useEffect(() => {
        setData(x => { x.tenkanSenColor = color1; return x; })
    }, [color1])
    
    useEffect(() => {
        setData(x => { x.kijunSenColor = color2; return x; })
    }, [color2])
    
    useEffect(() => {
        setData(x => { x.upKumoColor = color3; return x; })
    }, [color3])
    
    useEffect(() => {
        setData(x => { x.downKumoColor = color4; return x; })
    }, [color4])
    
    useEffect(() => {
        setData(x => { x.chikouColor = color5; return x; })
    }, [color5])
    

    return (
        <div className="container">

        { (pickColor) && <ColorPicker setPickColor={setPickColor} color={color} setColor={setColor} /> }

        {!pickColor &&
            <>

                <div className="parameter"> Tenkan-sen: 
                
                    <input 
                        type={'text'} 
                        defaultValue={data.tenkanSen}
                        onChange={(e) => setData({...data, tenkanSen: e.target.value})} /> 
                
                </div>

                <div className="parameter"> Kijun-sen: 
                    
                    <input 
                        type={'text'} 
                        defaultValue={data.kijunSen}
                        onChange={(e) => setData({...data, kijunSen: e.target.value})} /> 
                
                </div>

                <div className="parameter"> Senkou Span B: 
                    
                    <input 
                        type={'text'} 
                        defaultValue={data.senkou}
                        onChange={(e) => setData({...data, senkou: e.target.value})} /> 
                
                </div>

                <div className="parameter"> 
                    Tenkan Sen: 

                    <div style={{width: 20}} className="color-picker" onClick={() => setPickColor(true)} >
                        <Color color={data.tenkanSenColor} width={'100%'} setColor={setColor} />
                    </div>
                    <Width setData={setData} field={'tenkanSenWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Kijun Sen: 

                    <div style={{width: 20}} className="color-picker" onClick={() => setPickColor(true)} >
                        <Color color={data.kijunSenColor} width={'100%'} setColor={setColor} />
                    </div>
                    <Width setData={setData} field={'kijunSenWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Up kumo: 

                    <div style={{width: 20}} className="color-picker" onClick={() => setPickColor(true)} >
                        <Color color={data.upKumoColor} width={'100%'} setColor={setColor} />
                    </div>
                    <Width setData={setData} field={'upKumoWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Down kumo: 

                    <div style={{width: 20}} className="color-picker" onClick={() => setPickColor(true)} >
                        <Color color={data.downKumoColor} width={'100%'} setColor={setColor} />
                    </div>
                    <Width setData={setData} field={'downKumoWidth'} data={data} />
                </div> 


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

export default Ichimoku
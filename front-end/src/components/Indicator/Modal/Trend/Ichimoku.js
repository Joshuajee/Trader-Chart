import { useState } from "react";
import Action from "../Utils/Action";
import ColorPicker, { Color } from "../Utils/ColorPicker";
import Width from "../Utils/Width";

const indicator = {
    type: 'ICK',
    tenkanSen: 9,
    kijunSen: 26,
    senkou: 52,
    tenkanSenColor: 'red',
    kijunSenColor: '#0096c7',
    upKumoColor: '#ffba08',
    downKumoColor: '#ade8f4',
    chikouColor: '#606c38',
    tenkanSenWidth: '2px',
    kijunSenWidth: '2px',
    upKumoWidth: '1px',
    downKumoWidth: '1px',
    chikouWidth: '2px',
}

const Ichimoku = (props) => {

    const { addIndicator, symbol, setModal, update, updateIndicator, deleteIndicator } = props
    const [data, setData] = useState(update? update : indicator)
    const [pickColor, setPickColor] = useState(false)

    const [field, setField] = useState('tenkanSenColor')

    return (
        <div className="container">

        { (pickColor) && <ColorPicker data={data} setData={setData} field={field} setPickColor={setPickColor} /> }

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

                    <div style={{width: 20}} className="color-picker" onClick={() => { setPickColor(true); setField('tenkanSenColor') }} >
                        <Color color={data.tenkanSenColor} width={'100%'} />
                    </div>
                    <Width setData={setData} field={'tenkanSenWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Kijun Sen: 

                    <div style={{width: 20}} className="color-picker" onClick={() => { setPickColor(true); setField('kijunSenColor') }} >
                        <Color color={data.kijunSenColor} width={'100%'} />
                    </div>
                    <Width setData={setData} field={'kijunSenWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Up kumo: 

                    <div style={{width: 20}} className="color-picker" onClick={() => { setPickColor(true); setField('kijunSenColor') }} >
                        <Color color={data.upKumoColor} width={'100%'} />
                    </div>
                    <Width setData={setData} field={'upKumoWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Down kumo: 

                    <div style={{width: 20}} className="color-picker" onClick={() => { setPickColor(true); setField('downKumoColor') }} >
                        <Color color={data.downKumoColor} width={'100%'} />
                    </div>
                    <Width setData={setData} field={'downKumoWidth'} data={data} />
                </div> 

                <div className="parameter"> 
                    Chikou Span: 

                    <div style={{width: 20}} className="color-picker" onClick={() => { setPickColor(true); setField('chikouColor') }} >
                        <Color color={data.chikouColor} width={'100%'} />
                    </div>
                    <Width setData={setData} field={'chikouWidth'} data={data} />
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
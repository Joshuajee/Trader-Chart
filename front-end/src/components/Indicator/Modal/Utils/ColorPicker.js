import { useEffect, useState } from "react";

const ColorPicker = (props) => {

    const { setData, data, field, setPickColor } = props

    const [color, setColor] = useState(data[field])

    useEffect(() => {
        setData( d => { d[field] = color; return d})
    }, [field, color, setData])

    return( 
            <div className='color-picker'>
 
                <Color color='#03071e' setColor={setColor}/>
                <Color color='#370617' setColor={setColor}/>
                <Color color='#6a040f' setColor={setColor}/>
                <Color color='#9d0208' setColor={setColor}/>
                <Color color='#d00000' setColor={setColor}/>
                <Color color='#e85d04' setColor={setColor}/>
                <Color color='#f48c06' setColor={setColor}/>
                <Color color='#faa307' setColor={setColor}/>
                <Color color='#ffba08' setColor={setColor}/>
                <Color color='#ffba08' setColor={setColor}/>
                <Color color='#d9ed92' setColor={setColor}/>
                <Color color='#b5e48c' setColor={setColor}/>
                <Color color='#99d98c' setColor={setColor}/>
                <Color color='#76c893' setColor={setColor}/>
                <Color color='#52b69a' setColor={setColor}/>
                <Color color='#34a0a4' setColor={setColor}/>
                <Color color='#168aad' setColor={setColor}/>
                <Color color='#1a759f' setColor={setColor}/>
                <Color color='#1e6091' setColor={setColor}/>
                <Color color='#184e77' setColor={setColor}/>
                <Color color='#03045e' setColor={setColor}/>
                <Color color='#023e8a' setColor={setColor}/>
                <Color color='#0077b6' setColor={setColor}/>
                <Color color='#0096c7' setColor={setColor}/>
                <Color color='#00b4d8' setColor={setColor}/>
                <Color color='#48cae4' setColor={setColor}/>
                <Color color='#90e0ef' setColor={setColor}/>
                <Color color='#ade8f4' setColor={setColor}/>
                <Color color='#caf0f8' setColor={setColor}/>
                <Color color='#606c38' setColor={setColor}/>
                <Color color='#ffbe0b' setColor={setColor}/>
                <Color color='red' setColor={setColor}/>

                <br/>
                <button onClick={() => setPickColor(false)}>Select</button>
                <div className="color" style={{backgroundColor: color}}> </div>
            </div>
            )
}

const Color = (props) => {

    const { color, setColor, width } = props

    return <button 
                onClick={() => setColor(color)} 
                className="color" 
                style={{backgroundColor: color, width: width}}> </button>
}




export default ColorPicker

export {
    Color
}
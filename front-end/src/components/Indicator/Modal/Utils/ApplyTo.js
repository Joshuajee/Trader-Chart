const ApplyTo = ({setData, data}) => {

    return (
        <div className="parameter"> 

        Apply to: 
            <select  onClick={(e) => setData({...data, applyTo: e.target.value})} > 
                <option selected={data?.applyTo === 'close' ? 'selected' : ''} value={'close'}> Close </option> 
                <option selected={data?.applyTo === 'open' ? 'selected' : ''} value={'open'}> Open </option> 
                <option selected={data?.applyTo === 'high' ? 'selected' : ''} value={'high'}> High </option> 
                <option selected={data?.applyTo === 'low' ? 'selected' : ''} value={'low'}> Low </option> 
                <option selected={data?.applyTo === 'median' ? 'selected' : ''} value={'median'}> Median (HL/2) </option> 
                <option selected={data?.applyTo === 'typical' ? 'selected' : ''} value={'typical'}> Typical Price (HLC/3)</option> 
                <option selected={data?.applyTo === 'weighted' ? 'selected' : ''} value={'weighted'}> Weighted Close (HLCC/4)</option> 
            </select> 

        </div>
    )
}


export default ApplyTo
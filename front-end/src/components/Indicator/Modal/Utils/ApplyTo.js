const ApplyTo = ({setData, data}) => {

    return (
        <div className="parameter"> 

        Apply to: 
            <select onClick={(e) => setData({...data, applyTo: e.target.value})} > 
                <option value={'close'}> Close </option> 
                <option value={'open'}> Open </option> 
                <option value={'high'}> High </option> 
                <option value={'low'}> Low </option> 
                <option value={'median'}> Median (HL/2) </option> 
                <option value={'typical'}> Typical Price (HLC/3)</option> 
                <option value={'weighted'}> Weighted Close (HLCC/4)</option> 
            </select> 

    </div>
    )
}


export default ApplyTo
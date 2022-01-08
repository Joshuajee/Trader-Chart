const LineWidth = ({setData, data}) => {

    return (
        <div className="parameter"> 

        Line Width: 
            <select onClick={(e) => setData({...data, lineWidth: e.target.value})}> 
                <option value={'1px'}> 1px </option> 
                <option value={'2px'}> 2px </option> 
                <option value={'3px'}> 3px </option> 
                <option value={'4px'}> 4px </option> 
            </select> 

    </div>
    )
}

export default LineWidth
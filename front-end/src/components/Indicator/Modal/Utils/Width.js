const Width = ({setData, data, field}) => {

    return (
            <select onClick={(e) => setData({...data, [field]: e.target.value})}> 
                <option selected={data[field] === '1px' ? 'selected' : ''} value={'1px'}> 1px </option> 
                <option selected={data[field] === '2px' ? 'selected' : ''} value={'2px'}> 2px </option> 
                <option selected={data[field] === '3px' ? 'selected' : ''} value={'3px'}> 3px </option> 
                <option selected={data[field] === '4px' ? 'selected' : ''} value={'4px'}> 4px </option> 
            </select> )
}

export default Width
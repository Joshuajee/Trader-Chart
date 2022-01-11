const Width = ({setData, data, field}) => {

    return (
            <select onClick={(e) => setData({...data, [field]: e.target.value})}> 
                <option selected={data?.lineWidth === '1px' ? 'selected' : ''} value={'1px'}> 1px </option> 
                <option selected={data?.lineWidth === '2px' ? 'selected' : ''} value={'2px'}> 2px </option> 
                <option selected={data?.lineWidth === '3px' ? 'selected' : ''} value={'3px'}> 3px </option> 
                <option selected={data?.lineWidth === '4px' ? 'selected' : ''} value={'4px'}> 4px </option> 
            </select> )
}

export default Width
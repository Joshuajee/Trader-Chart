const Action = (props) => {

    const { updateIndicator, addIndicator, symbol, setModal, data, update } = props

    return <div className="actions">

                { !update &&
                    <button onClick={() => { 
                        addIndicator({ indicator: data, symbol: symbol }); 
                        setModal(false); 
                    }} > Save </button>
                }

                { update &&
                    <><button onClick={() => { 
                        updateIndicator({ indicator: data, symbol: symbol, instruction: 'edit' }); 
                        setModal(false); 
                    }} > UPDATE </button>

                    <button onClick={() => { 
                        updateIndicator({ indicator: data, symbol: symbol, instruction: 'delete'  }); 
                        setModal(false); 
                    }} > DELETE </button> </> }
            </div>
}


export default Action
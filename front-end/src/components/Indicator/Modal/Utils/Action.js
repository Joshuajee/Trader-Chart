const Action = (props) => {

    const { updateIndicator, addIndicator, symbol, setModal, data, update } = props

    console.log(symbol)

    return <div>

                { !update &&
                    <button onClick={() => { 
                        addIndicator({ indicator: data, symbol: symbol }); 
                        setModal(false); 
                    }} > OK </button>
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
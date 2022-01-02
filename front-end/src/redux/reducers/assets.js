const assetReducer = (state, payload) => {

    const symbol = payload.data[0].symbol

    console.log(payload)

    if(state.assets[payload.data[0].symbol]) console.log("yes")

    console.log(symbol)

    const assets = {...state.assets}
    assets[symbol] = payload 

    console.log(assets)

    return assets
}



export default assetReducer
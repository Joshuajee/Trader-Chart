const assetReducer = (state, payload) => {

    const symbol = payload.data[0]?.metadata?.symbol
    const start = payload.start

    const assets = {...state.assets}

    if (start) {

        assets[symbol] = payload 
        return assets

    } else return upDateByScroll(assets, payload)

}


const upDateByScroll = (assets, payload) => {

    const symbol = payload.data[0]?.metadata?.symbol

    assets[symbol].data = [...payload.data, ...assets[symbol].data]

    return assets
}



export default assetReducer
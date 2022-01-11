const atr = (data, indicator) => {

    const TR = data.map(current => {
        const tr = current.values.high - current.values.low

        return {x: current.timestamp, tr}
    })

    let Atr = 0

    TR.map((tr, index) => {

        if(index + 1 === indicator.period) {
            Atr = Atr / indicator.period
            tr.atr = Atr
        } else if(index >= indicator.period) {
            Atr = (Atr * (indicator.period - 1) + tr.tr) / indicator.period
            tr.atr = Atr
        } else {
            Atr += tr.tr
            tr.atr = tr.tr
        }
        
        return tr
    })

    return TR

}


export default atr
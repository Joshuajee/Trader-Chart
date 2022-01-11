const parabolicSar = (data, indicator) => {

    let AF = indicator.step
    const maximum = indicator.maximum
    const result = []

    console.log(indicator)
    console.log(data)

    let PSAR = 0;
    let prevHigh = data[0].values.high
    let prevLow = data[0].values.low
    let EP = getEP(0, 0, prevHigh, prevLow)

    for (let i = 1; i < data.length; i++) {

        const high = data[i].values.high
        const low = data[i].values.low

        //console.log(prevHigh, prevLow, high, low)


        EP = getEP(prevHigh, prevLow, high, low)

        const uptrend = PSAR + AF * (EP - PSAR)

        if (AF < maximum) AF += AF

        prevHigh = high
        prevLow = low

        result.push(uptrend)

    }


    return result

}


export default parabolicSar

const getEP = (prevHigh, prevLow, high, low) => {

    const highDiff = (high - prevHigh);
    const lowDiff = (low - prevLow);

    if (highDiff > lowDiff)  return high
    else if (highDiff < lowDiff) return low


    return high
}
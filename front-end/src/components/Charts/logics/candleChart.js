import moment from "moment"

const labels = datum => {
        const t = datum.timestamp
        const date = moment.utc(t).format("MMM Do YYYY")
        const time = moment.utc(t).format("h:mm")
        return (`
                open:        ${datum.values.open} \n 
                high:        ${datum.values.high} \n 
                low:         ${datum.values.low} \n
                close:       ${datum.values.close} \n
                date: ${date} \n
                time:        ${time} \n
                `)

}




export {
    labels
}
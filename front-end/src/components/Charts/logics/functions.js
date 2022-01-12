const countDecimals = function (value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

const capFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export {countDecimals, capFirstLetter}
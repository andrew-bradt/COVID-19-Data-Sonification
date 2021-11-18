const msToDDMMYYYY = (ms)=>{
    const dateObj = new Date(ms);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth()+1;
    const date = dateObj.getDate();
    return `${date}-${month}-${year}`;
};

module.exports = msToDDMMYYYY;
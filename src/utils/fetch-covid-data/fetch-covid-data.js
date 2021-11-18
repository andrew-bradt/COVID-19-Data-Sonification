/*
- fetchCovidData retrieves COVID-19 statistics from https://api.opencovid.ca
- Returns an object with yesterday's statistics for the stat provided in the stat parameter
- loc should be a province or canada wise, defaults to canada if no argument provided
- DD_MM_YYYY should be formatted as DD-MM-YYYY.  If not provided, defaults to yesterday.
- DD_MM_YYYY converts to a time in milliseconds, in UTC-8
*/
const axios = require('axios');

const fetchCovidData = async(stat, DD_MM_YYYY, loc='canada')=>{
    const res = await axios({
        method:'get',
        url:'https://api.opencovid.ca/timeseries',
        params:{
            stat,
            loc,
            date:DD_MM_YYYY
        }
    });
    return res.data[stat][0];
};

module.exports = fetchCovidData;
/*
- fetchCovidData retrieves COVID-19 statistics from https://api.opencovid.ca
- Returns an object with yesterday's statistics for the stat provided in the stat parameter
- loc should be a province or canada wise, defaults to canada if no argument provided
*/
import axios from 'axios';

export async function fetchCovidData(stat, DD_MM_YYYY, loc='canada'){
    try {
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
    } catch (err){
        console.error('Error fetching data from Opencovid.ca:',err);
    }
};

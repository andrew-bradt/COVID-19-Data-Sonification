const fetchCovidData = require('./fetch-covid-data');

test('Should Retrieve Yesterdays Active Cases for Canada',()=>{
    return fetchCovidData('cases').then(data=>{
        expect(data).toEqual(expect.objectContaining({
            cases:expect.any(Number)
        }));
    });
});

test('Should Retrieve Yesterdays Deaths for Canada',()=>{
    return fetchCovidData('mortality').then(data=>{
        expect(data).toEqual(expect.objectContaining({
            deaths:expect.any(Number)
        }));
    });
});
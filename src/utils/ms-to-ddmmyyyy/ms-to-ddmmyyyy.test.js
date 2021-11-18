const msToDDMMYYYY = require('./ms-to-ddmmyyyy');
const TIME_ZONE_OFFSET_HRS = 8;
const ONE_DAY_MS = (TIME_ZONE_OFFSET_HRS+24) * 60 * 60 * 1000;
const MS = new Date(Date.now()-ONE_DAY_MS);

test(`Calling function with ${MS} should return 17-11-2021`,()=>{
    expect(msToDDMMYYYY(MS)).toBe('17-11-2021');
});

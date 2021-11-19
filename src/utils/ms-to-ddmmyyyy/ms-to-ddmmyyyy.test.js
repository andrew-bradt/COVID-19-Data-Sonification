import {msToDDMMYYYY} from './ms-to-ddmmyyyy';
const MS = 1637275829000;

test(`Calling function with ${MS} should return 18-11-2021`,()=>{
    expect(msToDDMMYYYY(MS)).toBe('18-11-2021');
});

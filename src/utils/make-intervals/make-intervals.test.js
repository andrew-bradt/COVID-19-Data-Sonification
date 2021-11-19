import {makeIntervals} from './make-intervals';
import {ONE_DAY_MS} from '../../constants/constants';

const CASES = 3000;
const AVG_INTERVAL = ONE_DAY_MS/CASES;
const OFFSET_PERCENT = 0.25;
const MIN_INTERVAL_PERCENT = 1 - OFFSET_PERCENT;
const MAX_INTERVAL_PERCENT = 1 + OFFSET_PERCENT;
const MIN_INTERVAL_MS = AVG_INTERVAL * MIN_INTERVAL_PERCENT;
const MAX_INTERVAL_MS = AVG_INTERVAL * MAX_INTERVAL_PERCENT;

test(`Return an array with ${CASES} elements`,()=>{
    expect(makeIntervals(CASES).length).toBe(CASES);
});

test(`Intervals should be >= ${MIN_INTERVAL_MS}`,()=>{
    makeIntervals(CASES).forEach(interval=>{
        expect(interval).toBeGreaterThanOrEqual(MIN_INTERVAL_MS);
    });
});

test(`Intervals should be <= ${MAX_INTERVAL_MS}`,()=>{
    makeIntervals(CASES).forEach(interval=>{
        expect(interval).toBeLessThanOrEqual(MAX_INTERVAL_MS);
    });
});

test(`makeIntervals/ONE_DAY_MS should be >= 0.99`,()=>{
    const tolerance = ONE_DAY_MS*0.99/ONE_DAY_MS;
    const expected = makeIntervals(CASES).reduce((a,b)=>a+b)/ONE_DAY_MS;
    expect(expected).toBeGreaterThanOrEqual(tolerance);
});


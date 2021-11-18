const makeIntervals = require('./make-intervals');

const CASES = 3000;
const DAY_IN_MS = 24*60*60*1000;
const AVG_INTERVAL = DAY_IN_MS/CASES;
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

test(`makeIntervals/DAY_IN_MS should be >= 0.99`,()=>{
    const tolerance = DAY_IN_MS*0.99/DAY_IN_MS;
    const expected = makeIntervals(CASES).reduce((a,b)=>a+b)/DAY_IN_MS;
    expect(expected).toBeGreaterThanOrEqual(tolerance);
});


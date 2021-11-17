const makeIntervals = (dailyCount, offsetPercent=0.25)=>{
    const DAY_IN_MS = 24*60*60*1000;
    const avgInterval = DAY_IN_MS/dailyCount;
    const minIntervalPercent = 1 - offsetPercent;
    const maxIntervalPercent = 1 + offsetPercent;
    const minIntervalMs = avgInterval * minIntervalPercent;
    const maxIntervalMs = avgInterval * maxIntervalPercent;
    const offsetIntervalMs = maxIntervalMs - minIntervalMs;

    const convertPercentToMs = (x, min, offset)=>x*offset+min;

    const intervalsArrayPercentage = [];
    for (let i = 0; i < dailyCount; i++){
        const interval = convertPercentToMs(i/dailyCount, minIntervalMs, offsetIntervalMs);
        intervalsArrayPercentage.push(interval);
    }
    return intervalsArrayPercentage;
};

module.exports = makeIntervals;
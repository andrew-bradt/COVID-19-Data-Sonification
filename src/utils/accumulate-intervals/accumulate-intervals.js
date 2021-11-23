export function accumulateIntervals(intervalsArray){
    const accumulatedArray = [0];
    for (let i = 0; i < intervalsArray.length; i++){
        const previousVal = accumulatedArray[i];
        const currentVal = intervalsArray[i];
        accumulatedArray.push(previousVal + currentVal);
    }
    return accumulatedArray;
};
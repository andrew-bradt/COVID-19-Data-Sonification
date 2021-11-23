export function accumulateIntervals(intervalsArray){
    const accumulatedArray = [0];
    let acc = 0;
    for (let i = 0; i < intervalsArray.length; i++){
        acc+=intervalsArray[i];
        accumulatedArray.push(acc);
    }
    return accumulatedArray;
};
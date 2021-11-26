import { accumulateIntervals } from "./accumulate-intervals";

test('[1,2,3,4,5] should return [0,1,3,6,10,15]',()=>{
    const expected = accumulateIntervals([1,2,3,4,5]);
    expect(expected).toEqual([0,1,3,6,10,15]);
});
import { accumulateIntervals } from "./accumulate-intervals";

test('[1,2,3,4] should return [0,1,3,6,10]',()=>{
    const expected = accumulateIntervals([1,2,3,4]);
    console.log(expected);
    expect(expected).toEqual([0,1,3,6,10]);
});
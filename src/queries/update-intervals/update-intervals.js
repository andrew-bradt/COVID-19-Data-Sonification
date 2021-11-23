/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import {updateDoc, runTransaction, serverTimestamp} from 'firebase/firestore';
/*
************************************************************************************************
CUSTOM_MODULES
************************************************************************************************
*/
import {db} from '../../index';
import {makeIntervals} from '../../utils/make-intervals/make-intervals';
import { accumulateIntervals } from '../../utils/accumulate-intervals/accumulate-intervals';
/*
************************************************************************************************
FUNCTION DECLARATION
    - Description
************************************************************************************************
*/
export async function updateIntervals(dailyCount, lastUpdateDocRef, arrayDocRef, offsetPercent){
    const intervals = makeIntervals(dailyCount-1, offsetPercent);
    const accumulatedIntervals = accumulateIntervals(intervals);
    try {
        await runTransaction(db,async(transaction)=>{
            await updateDoc(lastUpdateDocRef,{timestamp:serverTimestamp()});
            transaction.update(arrayDocRef,{array:accumulatedIntervals});
        });
        return accumulatedIntervals;
    } catch (err){
        console.error('Error with Transaction',err);
    }
};

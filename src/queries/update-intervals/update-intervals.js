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
/*
************************************************************************************************
FUNCTION DECLARATION
    - Description
************************************************************************************************
*/
export async function updateIntervals(dailyCount, lastUpdateDocRef, arrayDocRef, offsetPercent){
    const intervals = makeIntervals(dailyCount, offsetPercent);
    try {
        await runTransaction(db,async(transaction)=>{
            await updateDoc(lastUpdateDocRef,{timestamp:serverTimestamp()});
            transaction.update(arrayDocRef,{array:intervals});
        });
    } catch (err){
        console.error('Error with Transaction',err);
    }
};

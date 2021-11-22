/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import {getDoc} from 'firebase/firestore';
/*
************************************************************************************************
CUSTOM_MODULES
************************************************************************************************
*/
import {db} from '../../index';
/*
************************************************************************************************
FUNCTION DECLARATION
    - Description
************************************************************************************************
*/
export async function readIntervals(intervalsDocRef){
    try {
        const docSnap = await getDoc(intervalsDocRef);
        const intervals = await docSnap.data().array;
        return intervals;
    } catch(err){
        console.error('Error reading Intervals',err);
    };
};
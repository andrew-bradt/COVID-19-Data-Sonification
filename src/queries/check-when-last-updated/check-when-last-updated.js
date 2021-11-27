/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import { getDoc } from 'firebase/firestore';
/*
************************************************************************************************
CUSTOM MODULES
************************************************************************************************
*/
import {
  ONE_DAY_MS,
  YESTERDAY_MS,
} from '../../constants/constants';
/*
************************************************************************************************
EXPORTS
  - Description
************************************************************************************************
*/
export async function checkWhenLastUpdated(docRef) {
  try {
    const docSnap = await getDoc(docRef);
    const { timestamp } = docSnap.data();
    const lastUpdateMs = timestamp.toMillis();
    const timeSinceLastUpdate = YESTERDAY_MS - lastUpdateMs;
    return timeSinceLastUpdate < ONE_DAY_MS;
  } catch (err) {
    console.error('Issue reading when intervals were last updated', err);
  }
}

'use strict';
/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import { initializeApp } from 'firebase/app';
import { getFirestore, doc} from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config.js';
import * as Tone from 'tone';
/*
************************************************************************************************
CUSTOM MODULES
************************************************************************************************
*/
// Constants
import {ONE_DAY_MS, YESTERDAY_MS,} from './constants/constants';
// Utils
import {msToDDMMYYYY} from './utils/ms-to-ddmmyyyy/ms-to-ddmmyyyy';
import {fetchCovidData} from './utils/fetch-covid-data/fetch-covid-data';
// Query Functions
import {checkWhenLastUpdated} from './queries/check-when-last-updated/check-when-last-updated';
import {readIntervals} from './queries/read-intervals/read-intervals';
import {updateIntervals} from './queries/update-intervals/update-intervals';
/*
************************************************************************************************
MISC
************************************************************************************************
*/
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export const db = getFirestore();

async function readOrWriteIntervals(){
  const lastUpdateDocRef = doc(db, 'lastUpdate','date');
  const casesDocRef = doc(db,'cases','intervals');
  const isLastUpdateRecent = await checkWhenLastUpdated(lastUpdateDocRef);
  if(isLastUpdateRecent){
    const intervals = await readIntervals(casesDocRef);
  } else {
    const dataDate = msToDDMMYYYY(YESTERDAY_MS);
    const covidData = await fetchCovidData('cases',dataDate);
    if(covidData){
      return updateIntervals(covidData.cases,lastUpdateDocRef,casesDocRef);
    };
  }
};

readOrWriteIntervals();




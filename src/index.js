'use strict';
/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import { initializeApp } from 'firebase/app';
import { getFirestore, doc} from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config.js';
import {start} from 'tone';
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
// Tone Functions
/*
************************************************************************************************
FUNCTIONS & VARIABLES
************************************************************************************************
*/
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
export const db = getFirestore();

async function readOrWriteIntervals(){
  const lastUpdateDocRef = doc(db, 'lastUpdate','date');
  const casesDocRef = doc(db,'cases','intervals');
  const isLastUpdateRecent = await checkWhenLastUpdated(lastUpdateDocRef);
  let intervals;
  if(isLastUpdateRecent){
    intervals = await readIntervals(casesDocRef);
  } else {
    const dataDate = msToDDMMYYYY(YESTERDAY_MS);
    const covidData = await fetchCovidData('cases',dataDate);
    if(covidData){
      intervals = await updateIntervals(covidData.cases,lastUpdateDocRef,casesDocRef);
    };
  }
  return intervals;
};
(async()=>{
  const intervals = await readOrWriteIntervals();
  console.log(intervals);
})();
/*
************************************************************************************************
DOM ELEMENTS & EVENT LISTENERS
************************************************************************************************
*/
const startButton = document.querySelector('#start-tone');

startButton.addEventListener('click',async()=>await start());
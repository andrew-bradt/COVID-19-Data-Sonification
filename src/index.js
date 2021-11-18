'use strict';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';


const fetchCovidData = require('./utils/fetch-covid-data/fetch-covid-data');
const makeIntervals = require('./utils/make-intervals/make-intervals');

import { getFirebaseConfig } from './firebase-config.js';

const firebaseAppConfig = getFirebaseConfig();

const test = (async()=>{
  const {cases} = await fetchCovidData('cases');
  console.log(makeIntervals(cases));
})();


initializeApp(firebaseAppConfig);



/*
************************************************************************************************
NODE_MODULES
************************************************************************************************
*/
import {useEffect, useState} from 'react';
import {doc} from 'firebase/firestore';
import * as Tone from 'tone';
/*
************************************************************************************************
CUSTOM MODULES
************************************************************************************************
*/
// Firebase Config
import {db} from './firebase-config';
// // Constants
import {YESTERDAY_MS,} from './constants/constants';
// Utils
import {msToDDMMYYYY} from './utils/ms-to-ddmmyyyy/ms-to-ddmmyyyy';
import {fetchCovidData} from './utils/fetch-covid-data/fetch-covid-data';
// Query Functions
import {checkWhenLastUpdated} from './queries/check-when-last-updated/check-when-last-updated';
import {readIntervals} from './queries/read-intervals/read-intervals';
import {updateIntervals} from './queries/update-intervals/update-intervals';
// Tone Functions
import {loadBuffers, scheduleTransport, generateSamplers} from './tone/schedule-transport/schedule-transport';
/*
************************************************************************************************
COMPONENT IMPORTS
************************************************************************************************
*/
import Ready from './components/ready';
import NotReady from './components/not-ready';
/*
************************************************************************************************
FUNCTIONS & VARIABLES
************************************************************************************************
*/
const output = new Tone.Gain(0.2).toDestination();

function App() {
  const [intervalsState, setIntervalsState] = useState(null);
  const [buffers, setBuffers] = useState(null);
  const [isToneReady, setIsToneReady] = useState(false);

  useEffect(()=>{
    (async()=>{
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
      return setIntervalsState(intervals);
    })();
  },[]);
  useEffect(()=>{
    if(intervalsState){
      loadBuffers(process.env.AUDIO_PATHS, setBuffers);
    }
  },[intervalsState]);
  useEffect(()=>{
    if(buffers && intervalsState){
      const samplers = generateSamplers(buffers,output);
      scheduleTransport(intervalsState,samplers);
      setIsToneReady(true);
    }
  },[buffers, intervalsState]);
  return (
    <div className="App">
      {
        isToneReady ? <Ready/> : <NotReady/>
      }
    </div>
  );
}


export default App;

import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAV3zXdTjjWlHGFUV-k06GiM187ROPTo2c",
  authDomain: "covid-19-data-sonification.firebaseapp.com",
  projectId: "covid-19-data-sonification",
  storageBucket: "covid-19-data-sonification.appspot.com",
  messagingSenderId: "191115693793",
  appId: "1:191115693793:web:07e0ddd39987c2348bb1a0"
};

function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}

initializeApp(getFirebaseConfig());
export const db = getFirestore();
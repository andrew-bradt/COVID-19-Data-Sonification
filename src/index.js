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
import { getFirebaseConfig } from './firebase-config.js';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);


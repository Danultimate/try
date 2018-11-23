import Config from './config';

let apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId;
if (Config.DEV) {
    apiKey = "AIzaSyARBl2WF7zekhnMe4Lw9F9fXSh8o8HpfrE",
    authDomain = "elenas-react-test.firebaseapp.com",
    databaseURL = "https://elenas-react-test.firebaseio.com",
    projectId = "elenas-react-test",
    storageBucket = "elenas-react-test.appspot.com",
    messagingSenderId = "377177602358"
} else {
  apiKey = "AIzaSyBRt6tMqb80yenhPgDtOPyseZPSru41BuA",
  authDomain = "elenas-react.firebaseapp.com",
  databaseURL = "https://elenas-react.firebaseio.com",
  projectId = "elenas-react",
  storageBucket = "elenas-react.appspot.com",
  messagingSenderId = "367365028708"
}

export default {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId
};

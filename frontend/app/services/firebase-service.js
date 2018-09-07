import Ember from 'ember';

const fbase = firebase;

const CONFIG = {
  apiKey: "AIzaSyCE5LDTGbVAPmLwiO1_r2fmzpoAVJj9eHs",
  authDomain: "seller-descubre.firebaseapp.com",
  databaseURL: "https://seller-descubre.firebaseio.com",
  projectId: "seller-descubre",
  storageBucket: "",
  messagingSenderId: "28374978617"
};

const MESSAGING_KEY = "messsaging_key"
let messaging;

export default Ember.Service.extend({

  init() {
    console.log("Firebase service init");
    fbase.initializeApp(CONFIG);
    messaging = fbase.messaging();
    this.enablePushNotification();
    this.messageListener();
    //messaging.onTokenRefresh(this.onTokenRefresh);
    //this.set(MESSAGING_KEY, fbase.messaging());
  },

  messageListener() {
    messaging.onMessage((payload) => {
      console.log("ONMeSSaGe called");
      console.log(payload);
   });
  },

  enablePushNotification() {
    console.log("enablePushNotification()", "activated");
    messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
      this.getTokenForFCM("sabin");
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  },

  getTokenForFCM($username){
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        console.log("Token generated", currentToken);
        // var instance = axios.create({
        //   headers: {
        //     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        //   }
        // });

        // const data = new FormData();
        // data.append('username', $username_pa);
        // data.append('token', currentToken);

        // instance.post('https://google.com',data)
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  },

  onTokenRefresh() {
    this.getTokenForFCM("sabin");
  }

});

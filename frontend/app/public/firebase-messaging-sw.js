// Initialize Firebase
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '691111012933'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

// Note: setBackgroundMessageHandler does not get called when "notifcation" key is sent throught payload
// Only use setBackgroundMessageHandler to customize without needing to send "notification" payload

messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  const notificationTitle = "Message from " + payload.data.SENDER;
  const notificationOptions = {
    body: payload.data.TEXT,
    icon: payload.data.icon,
    data: payload.data
  };

  self.clients.matchAll({
        includeUncontrolled: true,
        type: "window"
      }).then(all => all.forEach(client => {
        client.postMessage(payload); // Send messages to the client. Clients need to register "message" event
  }));

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

// self.addEventListener('push', function(event) {
//   self.clients.matchAll({
//     includeUncontrolled: true,
//     type: "window"
//   }).then(all => all.forEach(client => {
//
//   }));
// });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  console.log("notificationclick called");
  console.log(event);
  console.log("notificationclick called ended");
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(self.clients.matchAll({
      includeUncontrolled: true, //important
      type: "window"
    }).then(function(clientList) {

      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];

        if (client.url.includes("http://localhost:4200/") && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow(event.notification.data.click_action);

    }));
});

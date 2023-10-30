importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
  apiKey: "AIzaSyC6TCyF2HUpiVnKcjUoIZDyaZBAjXU7pWM",
  authDomain: "signal-hub-eb98f.firebaseapp.com",
  projectId: "signal-hub-eb98f",
  storageBucket: "signal-hub-eb98f.appspot.com",
  messagingSenderId: "158518644966",
  appId: "1:158518644966:web:277b89e669edfbd2e6ab27",
  measurementId: "G-QT4QB85WZF"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});


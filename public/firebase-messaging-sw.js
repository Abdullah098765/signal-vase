importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
// });


self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const title = payload.notification.title;
  const body = payload.notification.body;

  // Retrieve custom data
  const imageUrl = payload.data.imageUrl;
  const iconUrl = payload.data.iconUrl;
  const clickAction = payload.data.clickAction;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: iconUrl,  // Set the icon using the custom data
      image: imageUrl,  // Set the image using the custom data
      // Add more options as needed
    })
  );
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();
console.log(event);
  // Open the specified URL
  event.waitUntil(
    clients.openWindow('clickAction')  // Use the clickAction from custom data
  );
});

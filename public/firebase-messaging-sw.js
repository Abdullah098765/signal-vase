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
  const title = payload.notification.title + "L"
  const body = payload.notification.body;
  // console.log(payload);
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      image: payload.notification.image
      // Add more options as needed
    })
    
  );
});



self.addEventListener('notificationclick', (event) => {
  // console.log('Notification clicked:', event);

  // Log the entire notification object
  console.log('Notification object:', event.notification);

  // Try accessing click_action directly
  // const clickAction = event.notification.data.click_action;
  // console.log('Click Action:', clickAction);

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/profile')
  );
});
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
import { addNeutral, addGood } from "../src/app/components/good-bad-buttons";
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const title = payload.notification.title;
  const body = payload.notification.body;

  // Retrieve custom data
  const imageUrl = payload.data.imageUrl;
  const iconUrl = payload.data.iconUrl;
  const clickAction = payload.data.clickAction;

  const buttonsData = JSON.parse(payload.data.buttons || '[]');
  const actions = buttonsData.slice(0, 2).map(button => ({
    action: button.action,
    title: button.title,
  }));

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: iconUrl,  // Set the icon using the custom data
      image: imageUrl,  // Set the image using the custom data
      data: {
        clickAction: clickAction,
      },
      actions: actions,
    })
  );
});

self.addEventListener('notificationclick', (event) => {

  const action = event.action;
  const clickAction = event.notification.data.clickAction;

  // Handle different action buttons
  if (action === 'goodSignal') {
    // Code to run when the "Good Signal" button is clicked
    console.log('User clicked Good Signal', clickAction.split('/')[2], clickAction.split('/')[3]);
    addGood(clickAction.split('/')[2], clickAction.split('/')[3])
    // Add your custom logic here
  } else if (action === 'neutralSignal') {
    // Code to run when the "Neutral Signal" button is clicked
    console.log('User clicked Neutral Signal', clickAction.split('/')[2], clickAction.split('/')[3]);
    addNeutral(clickAction.split('/')[2], clickAction.split('/')[3])
    // Add your custom logic here
  } else {
    // Code to run when the notification is clicked (not on an action button)
    console.log('User clicked the notification', clickAction.split('/')[2], clickAction.split('/')[3]);
    if (clickAction) {
      event.waitUntil(
        clients.openWindow(clickAction)
      );
    }
    // Add your custom logic here
  }

  event.notification.close();


});


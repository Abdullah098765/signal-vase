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

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const title = payload.notification.title;
  const body = payload.notification.body;

  // Retrieve custom data
  const imageUrl = payload.data.imageUrl;
  const iconUrl = payload.data.iconUrl;
  const clickAction = payload.data.clickAction;
  const receiverId = payload.data.receiverId;
  console.log(payload.data);
  const buttonsData = JSON.parse(payload.data.buttons || '[]');
  const actions = buttonsData.slice(0, 2).map(button => ({
    action: button.action,
    title: button.title,
  }));
  sendNotificationData(title,
    body,
    imageUrl,
    iconUrl,
    clickAction,
    actions,receiverId)
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
  const payload = event.notification.data.payload;
  const receiverId = payload.data.receiverId;
  console.log(receiverId);
  // Handle different action buttons
  if (action === 'goodSignal') {
    // Add your custom logic here
    addGood(clickAction.split('/')[2], receiverId)
    neutralDiscount(clickAction.split('/')[2], receiverId)
    badDiscount(clickAction.split('/')[2], receiverId)

  } else if (action === 'neutralSignal') {
    // Code to run when the "Neutral Signal" button is clicked
    console.log('User clicked Neutral Signal', clickAction.split('/')[2], receiverId);
    addNeutral(clickAction.split('/')[2], receiverId)
    goodDiscount(clickAction.split('/')[2], receiverId)
    badDiscount(clickAction.split('/')[2], receiverId)
    // Add your custom logic here
  } else {
    // Code to run when the notification is clicked (not on an action button)
    console.log('User clicked the notification', clickAction.split('/')[2], receiverId);
    if (clickAction) {
      event.waitUntil(
        clients.openWindow(clickAction)
      );
    }
    // Add your custom logic here
  }

  event.notification.close();


});




function addNeutral(signalId, userId,) {
  var myHeaders = new Headers();
  myHeaders.append("a", "dni");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "signalId": signalId,
    'neutralId': userId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://signal-hub.vercel.app/api/neutral-count", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return "Neutral counted"
}
function addGood(signalId, userId,) {
  var myHeaders = new Headers();
  myHeaders.append("a", "dni");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "signalId": signalId,
    'goodcounterId': userId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://signal-hub.vercel.app/api/good-count", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return "Good counted"

}


function goodDiscount(signalId, userId) {
  var myHeaders = new Headers();
  myHeaders.append("a", "dni");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "signalId": signalId,
    'goodDiscounterId': userId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://signal-hub.vercel.app/api/good-discount", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

function neutralDiscount(signalId, userId) {
  var myHeaders = new Headers();
  myHeaders.append("a", "dni");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "signalId": signalId,
    'counterId': userId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://signal-hub.vercel.app/api/neutral-discount", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
    })
    .catch(error => console.log('error', error));
}

function badDiscount(signalId, userId) {
  var myHeaders = new Headers();
  myHeaders.append("a", "dni");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "signalId": signalId,
    'badCounterId': userId
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://signal-hub.vercel.app/api/bad-discount", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

const sendNotificationData = async (title, body, imageUrl, iconUrl, clickAction, actions, receiverId) => {


  const notificationData = {
    title,
    body,
    imageUrl,
    iconUrl,
    clickAction,
    actions,
    receiverIds:[receiverId]
  };

  try {
    const response = await fetch('https://signal-hub.vercel.app/api/save-notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      console.log('Notification data sent successfully');
    } else {
      console.error('Failed to send notification data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error sending notification data:', error);
  }
}
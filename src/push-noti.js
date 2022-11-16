const isPushSupported = () => {
    //To check `push notification` permission is denied by user
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }

    //Check `push notification` is supported or not
    if (!('PushManager' in window)) {
        alert('Sorry, Push notification isn\'t supported in your browser.');
        return;
    }

    //Get `push notification` subscription
    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
        .then(function (registration) {
            registration.pushManager.getSubscription()
                .then(function (subscription) {
                    //If already access granted, enable push button status
                    if (subscription) {
                        console.log('access granted');
                    }
                    else {
                        console.log('access denied');
                    }
                })
                .catch(function (error) {
                    console.error('Error occurred while enabling push ', error);
                });
        });
}

const subscribePush = () => {
    navigator.serviceWorker.ready.then(function (registration) {
        if (!registration.pushManager) {
            alert('Your browser doesn\'t support push notification.');
            return false;
        }

        //To subscribe `push notification` from push manager
        registration.pushManager.subscribe({
            userVisibleOnly: true //Always show notification when received
        })
            .then(function (subscription) {
                console.info('Push notification subscribed.');
                console.log(subscription);
                //saveSubscriptionID(subscription);
                console.log('push status true');
            })
            .catch(function (error) {
                console.log('push status false');
                console.error('Push notification subscription error: ', error);
            });
    })
}

export const addNoti=()=>{
    isPushSupported()
    subscribePush()
}
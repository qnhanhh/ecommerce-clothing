// const subscribePush = () => {
//     console.log('hi');
//     Notification.requestPermission().then(result => {
//         if (result === 'granted') {
//             console.log('granted');
//             randomNotification()
//         }
//     })
// }

// const randomNotification = () => {
//     const notiTitle = 'random';
//     const options = {
//         body: 'noti body',
//     }
//     new Notification(notiTitle, options)
//     setTimeout(randomNotification, 5000)
// }

import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { firebaseConfig } from "./utils/firebase/firebase.utils"

const getPermission = () => {
    console.log('get permission')
     
    if (!("Notification" in window)) {
        console.log('browser does not support notification');
    } else if (Notification.permission === 'granted') {
        console.log('already granted');
        retrieveToken()
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('hi there');
                retrieveToken()
            }
        })
    }
}

const retrieveToken = () => {
    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging(app)
    getToken(messaging, { vapidKey: 'BCW94hoos5QV0WzQCaOceDrjkid11IR5PvFXZgjY7pVpmOEgq8jdqLLDEKoPTpnDdVSG-An5yAnExbEgjc-ZhLE' })
        .then(currentToken => {
            if (currentToken) {
                //send token to server to update ui
            } else {
                //request permission ui
                console.log('no token');
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const addNoti = () => {
    // subscribePush()
    getPermission()
}

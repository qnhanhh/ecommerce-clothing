//initialize firebase messaging in the sw when the app is not hosted on firebase hosting
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from 'firebase/messaging/sw'
import { firebaseConfig } from "./utils/firebase/firebase.utils";

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

onMessage(messaging, (payload) => {
    console.log('message: ', payload)
})

onBackgroundMessage(messaging, (payload) => {
    console.log('background message: ', payload);
    // const title = 'title';
    // const options = {
    //     body: 'body',
    //     icon: ''
    // }
    // new Notification(title, options)
})
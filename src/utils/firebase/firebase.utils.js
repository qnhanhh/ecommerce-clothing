import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_ibue-fQqHTLgDLQHTLBfiVqsL1HxQmc",
    authDomain: "ecommerce-clothing-ee471.firebaseapp.com",
    projectId: "ecommerce-clothing-ee471",
    storageBucket: "ecommerce-clothing-ee471.appspot.com",
    messagingSenderId: "130866350963",
    appId: "1:130866350963:web:1682de82974babc8fa9306"
}

initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    //if user data does not exist
    if (!userSnapshot.exists()) {
        //create/set the document with the data from userAuth in my collection
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    //if user data exists
    //return userDocRef
    return userDocRef
}
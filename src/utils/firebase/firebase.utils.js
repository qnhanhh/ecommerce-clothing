import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q=query(collectionRef)

    const querySnapshot=await getDocs(q)
    return querySnapshot.docs.map((docSnapshot)=>docSnapshot.data())
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return
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
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    //if user data exists
    //return userDocRef
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

//onAuthStateChanged: call callback function whenever the state of auth changes
//this is an open listener: always waiting to see whether the auth state changes -> changes -> callback function => memory leak if we dont tell it to stop when the component (user.context) unmounts 
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
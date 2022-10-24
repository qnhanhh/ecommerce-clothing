import { User } from 'firebase/auth'
import { AdditionalInformation, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase.utils'

export const getSnapshotFromUserAuth = async (userAuth: User, additionalInformation?: AdditionalInformation) => {
    try {
        const userSnapshot = await createUserDocumentFromAuth(userAuth, additionalInformation)
        if (userSnapshot) {
            return { id: userSnapshot.id, ...userSnapshot.data() }
        }
    } catch (error) {
        return error as Error
    }
}

export const isUserAuthenticated = async () => {
    try {
        const userAuth = await getCurrentUser()
        if (!userAuth) return
        return getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        return error as Error
    }
}

export const signOut = async () => {
    try {
        await signOutUser()
        return null
    } catch (error) {
        return error as Error
    }
}

export const signInWithGoogle = async () => {
    try {
        const { user } = await signInWithGooglePopup()
        return getSnapshotFromUserAuth(user)
    } catch (error) {
        return error as Error
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInAuthUserWithEmailAndPassword(email, password)
        if (userCredential) {
            const { user } = userCredential
            return getSnapshotFromUserAuth(user)
        }
    } catch (error) {
        return error as Error
    }
}

export const signUp = async (email: string, password: string, displayName: string) => {
    try {
        const userCredential = await createAuthUserWithEmailAndPassword(email, password)
        if (userCredential) {
            const { user } = userCredential
            return getSnapshotFromUserAuth(user, { displayName })
        }
    } catch (error) {
        return error as Error
    }
}
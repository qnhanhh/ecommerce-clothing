import { atom, selector } from 'recoil'

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userState = atom<UserState>({
    key: 'user',
    default: USER_INITIAL_STATE
})

export const userSelector = selector({
    key: 'userSelector',
    get: ({ get }) => {
        const userReducer = get(userState)
        const currentUser = userReducer.currentUser

        return { userReducer, currentUser }
    }
})
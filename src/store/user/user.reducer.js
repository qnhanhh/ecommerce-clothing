import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
    currentUser: null
}

//in redux, every single reducer receives every single action
//=> by default, return current state => the code knows that this part of the reducer didn't change
export const userReducer = (state = USER_INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}
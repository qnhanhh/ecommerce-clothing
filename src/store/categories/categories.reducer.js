import { CATEGORIES_ACTION_TYPES } from "./categories.types"

const CATEGORIES_INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action
    console.log('enter cat reducer');
    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            console.log('categories reducer');
            return { ...state, categories: payload }
        default:
            console.log('default reducer');
            return state
    }
}
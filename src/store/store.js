//combined place where all redux happens
//where states live, receive actions and dispatch them into reducers to update states

import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

//create custom middleware
const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }

    console.log('type: ', action.type)
    console.log('payload: ', action.payload)
    console.log('currentState: ', store.getState())

    next(action)

    console.log('next state: ', store.getState());
}

//middleware: library helper that runs before an action hits a reducer, stands between ui components and redux store
const middleWares = [loggerMiddleware]
const composedEnhancers = compose(applyMiddleware(...middleWares))

//root-reducer: combination of all reducers
export const store = createStore(rootReducer, undefined, composedEnhancers)

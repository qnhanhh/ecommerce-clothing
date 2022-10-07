//combined place where all redux happens
//where states live, receive actions and dispatch them into reducers to update states

import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { rootReducer } from './root-reducer'

//create custom middleware
// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action)
//     }

//     console.log('type: ', action.type)
//     console.log('payload: ', action.payload)
//     console.log('currentState: ', store.getState())

//     next(action)

//     console.log('next state: ', store.getState());
// }

//config to tell redux persist what we want
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//middleware: library helper that runs before an action hits a reducer, stands between ui components and redux store
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

//root-reducer: combination of all reducers
export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)
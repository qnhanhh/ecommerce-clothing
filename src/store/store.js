//combined place where all redux happens
//where states live, receive actions and dispatch them into reducers to update states

import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

//middleware: library helper that runs before an action hits a reducer
const middleWares=[logger]
const composedEnhancers=compose(applyMiddleware(...middleWares))

//root-reducer: combination of all reducers
export const store=createStore(rootReducer, undefined, composedEnhancers)

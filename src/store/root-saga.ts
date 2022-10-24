//encapsulate all different sagas

import {all, call} from 'typed-redux-saga/macro'

import { userSagas } from './user/user.saga'

//generator function
export function* rootSaga(){
    yield* all([call(userSagas)])
}
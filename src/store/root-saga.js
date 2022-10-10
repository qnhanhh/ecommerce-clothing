//encapsulate all different sagas

import {all, call} from 'redux-saga/effects'

import { categoriesSaga } from './categories/categories.saga'

//generator function
export function* rootSaga(){
    yield all([call(categoriesSaga)])
}
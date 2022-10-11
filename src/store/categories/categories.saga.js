import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types'

export function* fetchCategoriesAsync() {
    try {
        //call(): pass it a callable method and its param. function to effect
        // const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        const categoriesArray = yield call(getCategoriesAndDocuments);
        //put(): start the action with params
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories() {
    //takeLatest(): if you hear a bunch of a same action, give me the latest one and cancel the previous ones
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

//set up export, holds all sagas that are related to categories 
export function* categoriesSaga() {
    //all(): run everything inside and only complete when everything is done
    yield all([call(onFetchCategories)]) //any further calls don't happen until this line finishes => pause

}
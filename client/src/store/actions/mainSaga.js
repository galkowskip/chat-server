import userRootSaga from './userSaga'

import {
    all
} from 'redux-saga/effects';

export default function* mainSaga() {
    yield all([
        userRootSaga()
    ])
}
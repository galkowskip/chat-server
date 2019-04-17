import userRootSaga from './userSaga'
import messageRootSaga from './messageSaga'

import {
    all
} from 'redux-saga/effects';

export default function* mainSaga() {
    yield all([
        userRootSaga(),
        messageRootSaga()
    ])
}
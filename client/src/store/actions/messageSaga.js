import {
    all,
    takeEvery,
    takeLatest
} from "redux-saga/effects";

//SEND MESSAGE

function* sendMessageRequest(action) {
    /*
    try {
        console.log(action);
        yield db
            .collection("messages")
            .doc(`/${action.payload.messagesID}`)
            .update({
                messages: action.payload.message
            });
        yield put({
            type: "SEND_MESSAGE_SUCCESS"
        });
    } catch (error) {
        yield put({
            type: "SEND_MESSAGE_FAIL"
        });
        yield put({
            type: "MESSAGE_ERROR",
            payload: error
        });
    }
    */

}


function* sendMessageSaga() {
    yield takeEvery("SEND_MESSAGE_REQUEST", sendMessageRequest);
}

//GET MESSAGES

function* getMessagesRequest(action) {
    /*
    try {
        const query = yield db
            .collection("messages")
            .where("contactKey", "==", action.payload)
            .get();
        let data = {};
        yield query.forEach(item => {
            data = {
                data: item.data(),
                id: item.id
            };
        });
        console.log(data);
        yield put({
            
        });
    } catch (error) {
        yield put({
            type: "GET_MESSAGES_FAIL"
        });
        yield put({
            type: "MESSAGE_ERROR",
            payload: error
        });
    }
    */
}

function* getMessagesSaga() {
    yield takeLatest("GET_MESSAGES_REQUEST", getMessagesRequest);
}

export default function* messageRootSaga() {
    yield all([getMessagesSaga(), sendMessageSaga()]);
}
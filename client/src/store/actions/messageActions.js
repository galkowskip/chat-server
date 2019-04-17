import {
    store
} from "../..";
import SocketEmiter from "../SocketEmiter";

export function sendMessage(data) {
    SocketEmiter.sendMessage(data)
    store.dispatch({
        type: "SEND_MESSAGE_REQUEST",
        payload: data
    })
}

export function getMessagesSuccess(data) {
    store.dispatch({
        type: "GET_ALL_MESSAGES",
        payload: data
    })
}

export function newMessageSuccess(data) {
    store.dispatch({
        type: "ADD_MESSAGE",
        payload: data
    })
}
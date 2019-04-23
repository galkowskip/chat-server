import {
    store
} from "../..";
import SocketEmiter from "../SocketEmiter";
/**
 * Sends message string
 * @param {String} data 
 */
export function sendMessage(data) {
    SocketEmiter.sendMessage(data)
    store.dispatch({
        type: "SEND_MESSAGE_REQUEST",
        payload: data
    })
}
/**
 * Gets an array of messages from server
 * @param {Array<Object>} data 
 */
export function getMessagesSuccess(data) {
    store.dispatch({
        type: "GET_ALL_MESSAGES",
        payload: data
    })
}

/**
 * GEts one message from server
 * @param {Object} data 
 */
export function newMessageSuccess(data) {
    store.dispatch({
        type: "ADD_MESSAGE",
        payload: data
    })
}
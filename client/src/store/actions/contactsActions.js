import {
    store
} from '../../index'
import SocketEmiter from '../SocketEmiter';

/**
 * Sets targeted contact as active contact
 * @param {String} id Targets id
 */
export function selectContact(id) {
    if (!id) {
        console.log('No id')
    } else {
        SocketEmiter.getAllMessages(id)
        store.dispatch({
            type: "SELECT_CONTACT",
            payload: id
        })
    }
}
/**
 * Adds new contact with targeted user
 * @param {String} data targeted user's id
 */
export function addNewContact(data) {
    SocketEmiter.addMewContactRequest(data);
    store.dispatch({
        type: "ADD_NEW_CONTACT_REQUEST",
    })
}
/**
 * Deletes targeted contact
 * @param {String} data Targeted contact's id
 */
export function deleteContact(data) {
    SocketEmiter.deleteContactRequest(data)
    store.dispatch({
        type: "DELETE_CONTACT_REQUEST",
    })
}
/**
 * Response to searched user, gets Users in an Array
 * @param {*} data 
 */
export function userSearchDone(data) {
    store.dispatch({
        type: "USERS_SEARCH_DONE",
        payload: data
    })
}
/**
 * Starts search for user
 * @param {String} data 
 */
export function getContactsListSuccess(data) {
    store.dispatch({
        type: "GET_CONTACTS_LIST_SUCCESS",
        payload: data
    })
}
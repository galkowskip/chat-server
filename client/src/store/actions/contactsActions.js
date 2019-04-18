import {
    store
} from '../../index'
import SocketEmiter from '../SocketEmiter';


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

export function addNewContact(data) {
    SocketEmiter.addMewContactRequest(data);
    store.dispatch({
        type: "ADD_NEW_CONTACT_REQUEST",
    })
}

export function deleteContact(data) {
    SocketEmiter.deleteContactRequest(data)
    store.dispatch({
        type: "DELETE_CONTACT_REQUEST",
    })
}

export function userSearchDone(data) {
    store.dispatch({
        type: "USERS_SEARCH_DONE",
        payload: data
    })
}

export function getContactsListSuccess(data) {
    store.dispatch({
        type: "GET_CONTACTS_LIST_SUCCESS",
        payload: data
    })
}
import {
    store
} from "../../index";
/**
 * Request user data from server
 * @param {Object} user 
 */
export function login(user) {
    store.dispatch({
        type: "USER_FETCH_REQUESTED",
        payload: user
    });
}
/**
 * Destroys user data in redux store
 */
export function logout() {
    store.dispatch({
        type: "USER_LOGOUT_REQUESTED",
    });
}
/**
 * @param {Object} user 
 */
export function signIn(user) {
    store.dispatch({
        type: "USER_SIGNIN_REQUESTED",
        payload: user
    });
}
/**
 * Fired by listener watching userAuthorized event
 * @param {Object} data 
 */
export function watchUserAuthorizedDone(data) {
    store.dispatch({
        type: "USER_AUTH",
        payload: {
            user: data
        }
    })
}
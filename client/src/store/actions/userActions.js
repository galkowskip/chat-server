import {
    store
} from "../../index";

export function login(user) {
    store.dispatch({
        type: "USER_FETCH_REQUESTED",
        payload: user
    });
}

export function logout() {
    store.dispatch({
        type: "USER_LOGOUT_REQUESTED",
        payload: "1"
    });
}

export function signIn(user) {
    store.dispatch({
        type: "USER_SIGNIN_REQUESTED",
        payload: user
    });
}

export function watchUserAuthorizedDone(data) {
    store.dispatch({
        type: "USER_AUTH",
        payload: {
            user: data
        }
    })
}
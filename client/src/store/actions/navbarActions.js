import {
    store
} from "../../index"
//
export function navbarAction() {
    store.dispatch({
        type: "NAVBAR_ACTION"
    })
}
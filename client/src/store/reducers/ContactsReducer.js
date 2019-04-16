const initialState = {
    searchItems: [],
    items: [],
    isFetching: false,
    activeContact: ''
}

export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case "SELECT_CONTACT":
            return {
                ...state,
                activeContact: payload
            }
        case "GET_CONTACTS_REQUEST":
            return {
                ...state,
                isFetching: true,
            }
        case "GET_CONTACTS_LIST_SUCCESS":
            return {
                ...state,
                items: payload,
                isFetching: false,
            }
        case "GET_CONTACTS_FAIL":
            return {
                ...state,
                items: [],
                isFetching: false,
            }
        case "USERS_SEARCH_REQUEST":
            return {
                ...state,
                isFetching: true,
            }
        case "USERS_SEARCH_DONE":
            return {
                ...state,
                searchItems: payload,
                isFetching: false,
            }
        case "USERS_SEARCH_FAIL":
            return {
                ...state,
                searchItems: [],
                isFetching: false,
            }
        default:
            return state
    }
}
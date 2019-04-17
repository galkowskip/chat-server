const initialState = {
    data: {},
    isLoggedIn: false,
    inProgress: false,
}

export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case "USER_AUTH":
            return {
                inProgress: false,
                isLoggedIn: true,
                data: payload,
            }
        case "DESTROY_USER":
            return {
                inProgress: false,
                isLoggedIn: false,
                data: {},
            }
        case "USER_FETCH_REQUEST":
            return {
                ...state,
                inProgress: true
            }
        case "USER_FETCH_SUCCESS":
            return {
                ...state,
                data: payload,
                isLoggedIn: true,
                inProgress: false,
            }
        case "USER_FETCH_FAIL":
            return {
                ...state,
                inProgress: false,
            }
        case "USER_LOGOUT_SUCCESS":
            return {
                ...state,
            }
        case "USER_LOGOUT_FAIL":
            return {
                ...state,
            }
        default:
            return state
    }
}
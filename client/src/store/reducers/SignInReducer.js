const initialState = {
    signInCompleted: false,
    inProgress: false,
}

export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case "USER_SIGNUP_REQUEST":
            return { ...state,
                signInCompleted: false,
                inProgress: true
            }
        case "USER_SIGNUP_SUCCESS":
            return { ...state,
                signInCompleted: true
            }
        case "USER_SIGNUP_FAIL":
            return { ...state,
                signInCompleted: false,
            }
        default:
            return {
                signInCompleted: false
            }
    }
}
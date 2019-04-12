const initialState = {
    signinError: '',
    messageError: '',
    contactError: '',
    loginError: '',
}

export default (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case 'MESSAGE_ERROR':
            return { ...state,
                messageError: payload.message
            }
        case 'SIGNIN_ERROR':
            return { ...state,
                signinError: payload.message
            }
        case 'LOGIN_ERROR':
            return { ...state,
                loginError: payload.message
            }
        case 'CONTACT_ERROR':
            return { ...state,
                contactError: payload.message
            }
        default:
            return state
    }
}
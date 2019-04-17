const initialState = {
    open: false
}

export default (state = initialState, {
    type,
}) => {
    switch (type) {

        case "NAVBAR_ACTION":
            return {
                open: !state.open
            }
        default:
            return state
    }
}
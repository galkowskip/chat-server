const initialState = {
  messages: [],
  newMessage: false,
  processing: false,
};

export default (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        processing: false,
        messages: [...state.messages, payload]
      };
    case "GET_ALL_MESSAGES":
      return {
        ...state,
        processing: false,
        messages: payload
      }
    case "GET_MESSAGES_SUCCESS":
      return {
        ...state,
        processing: false,
        messages: payload
      }
    default:
      return state;
  }
};
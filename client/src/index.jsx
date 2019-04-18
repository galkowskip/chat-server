import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import mainSaga from "./store/actions/mainSaga";

import App from "./App";

import UserAuthReducer from "./store/reducers/UserAuthReducer";
import ContactsReducer from "./store/reducers/ContactsReducer";
import MessageReducer from "./store/reducers/MessageReducer";
import SignInReducer from "./store/reducers/SignInReducer";
import ErrorReducer from "./store/reducers/ErrorReducer";
import NavbarReducer from "./store/reducers/NavbarReducer";

const reducers = combineReducers({
  user: UserAuthReducer,
  contacts: ContactsReducer,
  messages: MessageReducer,
  signIn: SignInReducer,
  error: ErrorReducer,
  navbar: NavbarReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    /* eslint-enable */
  )
);

sagaMiddleware.run(mainSaga);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

render();

store.subscribe(render);

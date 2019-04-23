import {
  put,
  all,
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

//LOGIN SAGA
/**
 * Sends login data to server. If user is in the database, fires USER_FETCH_SUCCESS with user data, if not fires "USER_FETCH_FAILED" and an error
 * @param {Object} action
 */
function* loginRequest({payload}) {
  try {
    const user = yield axios.post("/login/local/auth", payload);
    yield put({
      type: "USER_FETCH_SUCCESS",
      payload: {
        user: user.data.user
      }
    });
  } catch (error) {
    yield put({
      type: "USER_FETCH_FAILED"
    });
    yield put({
      type: "LOGIN_ERROR",
      payload: error
    });
  }
}

function* loginUserSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", loginRequest);
}

//LOGOUT SAGA
/**
 * Sends a request for user login
 */
function* logoutRequest() {
  try {
    yield axios.get("/login/logout");
    yield put({
      type: "USER_LOGOUT_SUCCESS",
      payload: {
        user: false
      }
    });
  } catch (error) {
    yield put({
      type: "USER_LOGOUT_FAIL"
    });
    yield put({
      type: "SIGNIN_ERROR",
      payload: error
    });
  }
}

function* logoutUserSaga() {
  yield takeEvery("USER_LOGOUT_REQUESTED", logoutRequest);
}

//SignIn Saga
/**
 * Sends form with new user credentials for server to save in the database
 * @param {Object} action  Action object containing payload with form
 */
function* signInRequest({payload}) {
  try {
    const response = yield axios.post("/login/local/newUser", {
      user: payload
    });
    if (!response.data.error) {
      yield put({
        type: "USER_SIGNUP_SUCCESS",
        payload: response.data
      });
    } else {
      throw response.error;
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: "USER_SIGNIN_FAIL"
    });
    yield put({
      type: "SIGNIN_ERROR",
      payload: error
    });
  }
}

function* signInUserSaga() {
  yield takeEvery("USER_SIGNIN_REQUESTED", signInRequest);
}

// Root saga
export default function* userRootSaga() {
  yield all([logoutUserSaga(), loginUserSaga(), signInUserSaga()]);
}
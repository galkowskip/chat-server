import {
  put,
  all,
  takeEvery
} from "redux-saga/effects";

import axios from "axios";

//LOGIN SAGA

function* loginRequest(action) {
  try {
    const user = yield axios.post("/login/local/auth", action.payload);
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

function* signInRequest(action) {
  try {
    const response = yield axios.post("/login/local/newUser", {
      user: action.payload
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
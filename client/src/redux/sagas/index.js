// import { call, put, takeLatest } from "redux-saga/effects";
// import * as api from "../../api";
// import { getPosts } from "../actions";

// function* fetchPostSaga() {
//   try {
//     const posts = yield call(api.fetchPosts);
//     yield put(getPosts.getPostsSuccess(posts.data));
//   } catch (err) {
//     if (err.res.data === "Unauthorized") {
//     }
//   }
// }

// function* mySaga() {
//   yield takeLatest(getPosts.getPostsRequest, fetchPostSaga);
// }

// export default mySaga;

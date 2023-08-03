import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from "@redux-devtools/extension";

// export const makeStore = (context:any) => {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = configureStore({
//         reducer:rootReducer,
//         middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)
//     });

//     // store.sagaTask = sagaMiddleware.run(rootSaga);
//     return store;
// };

export const store = configureStore({
  reducer:rootReducer
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export const wrapper = createWrapper(makeStore, { debug: false });

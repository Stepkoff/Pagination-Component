import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "./services/postsApi";


export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postsApi.middleware)
})

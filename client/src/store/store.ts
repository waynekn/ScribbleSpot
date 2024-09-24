import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persitedReducer = persistReducer(persistConfig, rootReducer);

const isDev = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: persitedReducer,
  middleware: (getDefaultMiddleware) =>
    isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
});

export const persistor = persistStore(store);

export type StoreDispatch = typeof store.dispatch;

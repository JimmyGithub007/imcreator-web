import { configureStore } from "@reduxjs/toolkit";
import floorReducer from "./slice/floorSlice";

const store = configureStore({
    reducer: {
        floor: floorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface floorStatesProps {
    floor: number,
}

const initialState: floorStatesProps = {
    floor: 0,
};

export const floorSlice = createSlice({
    name: "floor",
    initialState,
    reducers: {
        setFloor: (state, action: PayloadAction<number>) => {
            state.floor = action.payload;
        },
        plusFloor: (state) => {
            if(state.floor < 4) state.floor++;
        },
        minusFloor: (state) => {
            if(state.floor > 0) state.floor--;
        },
    },
});

export const { setFloor, plusFloor, minusFloor } = floorSlice.actions;
export default floorSlice.reducer;
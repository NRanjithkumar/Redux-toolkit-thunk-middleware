import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false,
}

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        openModel:(state, action)=>{
            state.isOpen=true;
        },
        closeModel:(state, action)=>{
            state.isOpen=false;
        },
    }
});

export const {openModel,closeModel} = modalSlice.actions;
export default modalSlice.reducer;
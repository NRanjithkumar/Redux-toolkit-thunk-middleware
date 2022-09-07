import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModel } from "../modalSlice";

const url='https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount:4,
    total:0,
    isLoading: true,
}

/*export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url).then(resp => resp.json()).catch((err) => console.log(err));
});*/

export const getCartItems= createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    try{
        //console.log(name);
        //console.log(thunkAPI);
        //console.log(thunkAPI.getState());
       // console.log(thunkAPI.dispatch(openModel()));
        const resp= await axios(url);
        return resp.data;
    }
    catch(err){
        return thunkAPI.rejectWithValue('Something went wrong');
    };
});

const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state) => {
            state.cartItems=[];
        },
        removeItem:(state, action) => {
            //console.log(action);
            const itemId=action.payload;
            state.cartItems=state.cartItems.filter((item)=>item.id!== itemId);
        },
        increase:(state,{payload}) => {
            //console.log(payload);
            const cartItem=state.cartItems.find((item)=>item.id===payload.id);
            cartItem.amount=cartItem.amount+1;
        },
        decrease:(state,{payload}) => {
            const cartItem=state.cartItems.find((item)=>item.id===payload.id);
            cartItem.amount=cartItem.amount-1;
        },
        calculateTotals:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item) => {
                amount=amount+item.amount;
                total=total+ item.amount * item.price;
                //console.log(`Item id ${item.id} amount ${amount} total ${total}`);
            });
            state.amount=amount;
            state.total=total;
        }
    },
    extraReducers:{
        [getCartItems.pending]: (state) => {
            state.isLoading=true
        },
        [getCartItems.fulfilled]: (state,action) => {
            //console.log(action);
            state.isLoading=false
            state.cartItems=action.payload;
        },
        [getCartItems.rejected]: (state,action) => {
            console.log(action);
            state.isLoading=false
        },
        
    }
});

//console.log(cartSlice);
export default cartSlice.reducer;
export const {clearCart,removeItem,increase,decrease,calculateTotals}= cartSlice.actions;
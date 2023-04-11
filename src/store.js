import { configureStore, createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCount(state, action) {
      let find = state.find((item) => item.id === action.payload);
      find.count += 1;
    },

    addItem(state, action) {
      let find = state.find(item => item.id === action.payload.id);
      if(find) {
        find.count += 1;
      } else {
        action.payload.count = 1;
        state.push(action.payload);
        console.log(action.payload)
      }
    }
  }
})

export let { addCount, addItem } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer
  }
})




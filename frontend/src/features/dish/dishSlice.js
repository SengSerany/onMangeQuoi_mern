import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dishService from './dishService';

const initialState = {
  dishes: null,
  dishError: false,
  dishSuccess: false,
  dishLoading: false,
  dishMessage: '',
};

export const indexDishes = createAsyncThunk(
  'dish/index',
  async (_, thunkAPI) => {
    try {
      return await dishService.getAllDishes();
    } catch (error) {
      const dishMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dishMessage) ||
        error.dishMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(dishMessage);
    }
  }
);

export const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    resetDishState: (state) => {
      state.dishError = false;
      state.dishSuccess = false;
      state.dishLoading = false;
      state.dishMessage = '';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(indexDishes.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(indexDishes.fulfilled, (state, action) => {
        state.dishes = action.payload.dishes;
        state.dishLoading = false;
      })
      .addCase(indexDishes.rejected, (state, action) => {
        state.dishLoading = false;
        state.dishError = true;
        state.dishMessage = action.payload;
      }),
});

export const { resetDishState } = dishSlice.actions;

export default dishSlice.reducer;

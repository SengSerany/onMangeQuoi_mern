import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dishService from './dishService';

const initialState = {
  dishes: [],
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

export const createDish = createAsyncThunk(
  'dish/create',
  async (dishData, thunkAPI) => {
    try {
      return await dishService.createNewDishes(dishData);
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
      })
      .addCase(createDish.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.dishLoading = false;
        state.dishSuccess = true;
        console.log(action.payload);
        state.dishes.push(action.payload.dish);
        state.dishMessage = `Tu as crée le plat "${action.payload.dish.name}"`;
      })
      .addCase(createDish.rejected, (state, action) => {
        state.dishLoading = false;
        state.dishError = true;
        state.dishMessage = action.payload;
      }),
});

export const { resetDishState } = dishSlice.actions;

export default dishSlice.reducer;

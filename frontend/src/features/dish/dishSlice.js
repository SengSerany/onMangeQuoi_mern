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

export const updateDish = createAsyncThunk(
  'dish/update',
  async (dishData, thunkAPI) => {
    try {
      return await dishService.updateDishes(dishData);
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

export const deleteDish = createAsyncThunk(
  'dish/delete',
  async (dishID, thunkAPI) => {
    try {
      return await dishService.deleteDishes(dishID);
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
    logoutDishState: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(indexDishes.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(indexDishes.fulfilled, (state, action) => {
        state.dishes = action.payload.dishes ? action.payload.dishes : [];
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
        state.dishes.push(action.payload.dish);
        state.dishMessage = `Tu as crée le plat "${action.payload.dish.name}"`;
      })
      .addCase(createDish.rejected, (state, action) => {
        state.dishLoading = false;
        state.dishError = true;
        state.dishMessage = action.payload;
      })
      .addCase(updateDish.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.dishLoading = false;
        state.dishSuccess = true;
        state.dishes = state.dishes.map((dish) => {
          if (dish._id === action.payload.updatedDish._id) {
            return action.payload.updatedDish;
          } else {
            return dish;
          }
        });
        state.dishMessage = `Tu as modifié le plat "${action.payload.updatedDish.name}"`;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.dishLoading = false;
        state.dishError = true;
        state.dishMessage = action.payload;
      })
      .addCase(deleteDish.pending, (state) => {
        state.dishLoading = true;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishLoading = false;
        state.dishSuccess = true;
        state.dishes = state.dishes.filter(
          (dishes) => dishes._id !== action.payload.id
        );
        state.dishMessage = `Tu as supprimer le plat "${action.payload.name}"`;
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.dishLoading = false;
        state.dishError = true;
        state.dishMessage = action.payload;
      }),
});

export const { resetDishState, logoutDishState } = dishSlice.actions;

export default dishSlice.reducer;

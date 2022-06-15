import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shoppingListService from './shoppingListService';

const initialState = {
  shoppingLists: [],
  itemsInLists: [],
  shoppingListError: false,
  shoppingListSuccess: false,
  shoppingListLoading: false,
  shoppingListMessage: '',
};

export const indexShoppingLists = createAsyncThunk(
  'shoppingList/index',
  async (_, thunkAPI) => {
    try {
      return await shoppingListService.getAllShoppingLists();
    } catch (error) {
      const shoppingListMessage =
        (error.response &&
          error.response.data &&
          error.response.data.shoppingListMessage) ||
        error.shoppingListMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(shoppingListMessage);
    }
  }
);

export const createShoppingList = createAsyncThunk(
  'shoppingList/create',
  async (shoppingListData, thunkAPI) => {
    try {
      return await shoppingListService.createNewShoppingLists(shoppingListData);
    } catch (error) {
      const shoppingListMessage =
        (error.response &&
          error.response.data &&
          error.response.data.shoppingListMessage) ||
        error.shoppingListMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(shoppingListMessage);
    }
  }
);

export const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    resetShoppingListState: (state) => {
      state.shoppingListError = false;
      state.shoppingListSuccess = false;
      state.shoppingListLoading = false;
      state.shoppingListMessage = '';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(indexShoppingLists.pending, (state) => {
        state.shoppingListLoading = true;
      })
      .addCase(indexShoppingLists.fulfilled, (state, action) => {
        state.shoppingLists = action.payload.shoppingLists;
        // state.itemsInLists = action.payload.shoppingLists;
        state.shoppingListLoading = false;
      })
      .addCase(indexShoppingLists.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      })
      .addCase(createShoppingList.pending, (state) => {
        state.shoppingListLoading = true;
      })
      .addCase(createShoppingList.fulfilled, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListSuccess = true;
        state.shoppingLists.push(action.payload.shoppingList);
        // state.itemsInLists.push(...action.payload.setDishes);
        state.shoppingListMessage = `Tu as crée une nouvelle liste de course : "${action.payload.shoppingList.shoppingListName}"`;
      })
      .addCase(createShoppingList.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      }),
});

export const { resetShoppingListState } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;

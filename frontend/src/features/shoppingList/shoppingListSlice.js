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

export const updateShoppingList = createAsyncThunk(
  'shoppingList/update',
  async (shoppingListData, thunkAPI) => {
    try {
      return await shoppingListService.updateShoppingLists(shoppingListData);
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

export const deleteShoppingList = createAsyncThunk(
  'shoppingList/delete',
  async (shoppingListID, thunkAPI) => {
    try {
      return await shoppingListService.deleteShoppingLists(shoppingListID);
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

export const updateItemsState = createAsyncThunk(
  'shopItem/update',
  async (shopItemID, thunkAPI) => {
    try {
      return await shoppingListService.changeShopItemState(shopItemID);
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
        state.itemsInLists = action.payload.itemsList;
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
        state.itemsInLists.push(...action.payload.itemsList);
        state.shoppingListMessage = `Tu as crée une nouvelle liste de course : "${action.payload.shoppingList.shoppingListName}"`;
      })
      .addCase(createShoppingList.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      })
      .addCase(updateShoppingList.pending, (state) => {
        state.shoppingListLoading = true;
      })
      .addCase(updateShoppingList.fulfilled, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListSuccess = true;
        state.shoppingLists = state.shoppingLists.map((shoppingList) => {
          if (shoppingList._id === action.payload.updatedShoppingList._id) {
            return action.payload.updatedShoppingList;
          } else {
            return shoppingList;
          }
        });

        state.itemsInLists = state.itemsInLists.filter(
          (dishInShoppingList) =>
            dishInShoppingList.shoppingListID !==
            action.payload.updatedShoppingList._id
        );

        state.itemsInLists.push(...action.payload.itemsList);

        state.shoppingListMessage = `Tu as modifié la liste de course "${action.payload.updatedShoppingList.shoppingListName}"`;
      })
      .addCase(updateShoppingList.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      })
      .addCase(deleteShoppingList.pending, (state) => {
        state.shoppingListLoading = true;
      })
      .addCase(deleteShoppingList.fulfilled, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListSuccess = true;
        state.shoppingLists = state.shoppingLists.filter(
          (shoppingLists) => shoppingLists._id !== action.payload.id
        );
        state.itemsInLists = state.itemsInLists.filter(
          (link) => link.shoppingListID !== action.payload.id
        );
        state.shoppingListMessage = `Tu as supprimer la liste de course "${action.payload.name}"`;
      })
      .addCase(deleteShoppingList.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      })
      .addCase(updateItemsState.pending, (state) => {
        state.shoppingListLoading = true;
      })
      .addCase(updateItemsState.fulfilled, (state, action) => {
        state.shoppingListLoading = false;
        state.itemsInLists = state.itemsInLists.map((link) => {
          if (link._id !== action.payload.updatedShopItem._id) {
            return {
              ...link,
              isShopped: action.payload.updatedShopItem.isShopped,
            };
          } else {
            return link;
          }
        });
      })
      .addCase(updateItemsState.rejected, (state, action) => {
        state.shoppingListLoading = false;
        state.shoppingListError = true;
        state.shoppingListMessage = action.payload;
      }),
});

export const { resetShoppingListState } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;

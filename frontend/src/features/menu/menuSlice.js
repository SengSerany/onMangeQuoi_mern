import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
  menus: [],
  menuError: false,
  menuSuccess: false,
  menuLoading: false,
  menuMessage: '',
};

export const indexMenus = createAsyncThunk(
  'menu/index',
  async (_, thunkAPI) => {
    try {
      return await menuService.getAllMenus();
    } catch (error) {
      const menuMessage =
        (error.response &&
          error.response.data &&
          error.response.data.menuMessage) ||
        error.menuMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(menuMessage);
    }
  }
);

export const createMenu = createAsyncThunk(
  'menu/create',
  async (menuData, thunkAPI) => {
    try {
      return await menuService.createNewMenus(menuData);
    } catch (error) {
      const menuMessage =
        (error.response &&
          error.response.data &&
          error.response.data.menuMessage) ||
        error.menuMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(menuMessage);
    }
  }
);

// export const updateMenu = createAsyncThunk(
//   'menu/update',
//   async (menuData, thunkAPI) => {
//     try {
//       return await menuService.updateMenus(menuData);
//     } catch (error) {
//       const menuMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.menuMessage) ||
//         error.menuMessage ||
//         error.toString();
//       return thunkAPI.rejectWithValue(menuMessage);
//     }
//   }
// );

// export const deleteMenu = createAsyncThunk(
//   'menu/delete',
//   async (menuID, thunkAPI) => {
//     try {
//       return await menuService.deleteMenus(menuID);
//     } catch (error) {
//       const menuMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.menuMessage) ||
//         error.menuMessage ||
//         error.toString();
//       return thunkAPI.rejectWithValue(menuMessage);
//     }
//   }
// );

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    resetMenuState: (state) => {
      state.menuError = false;
      state.menuSuccess = false;
      state.menuLoading = false;
      state.menuMessage = '';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(indexMenus.pending, (state) => {
        state.menuLoading = true;
      })
      .addCase(indexMenus.fulfilled, (state, action) => {
        state.menus = action.payload.menus;
        state.menuLoading = false;
      })
      .addCase(indexMenus.rejected, (state, action) => {
        state.menuLoading = false;
        state.menuError = true;
        state.menuMessage = action.payload;
      })
      .addCase(createMenu.pending, (state) => {
        state.menuLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menuLoading = false;
        state.menuSuccess = true;
        state.menus.push(action.payload.menu);
        state.menuMessage = `Tu as crée le nouveau menu: "${action.payload.menu.menuName}"`;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.menuLoading = false;
        state.menuError = true;
        state.menuMessage = action.payload;
      }),
  // .addCase(updateMenu.pending, (state) => {
  //   state.menuLoading = true;
  // })
  // .addCase(updateMenu.fulfilled, (state, action) => {
  //   state.menuLoading = false;
  //   state.menuSuccess = true;
  //   state.menus = state.menus.map((menu) => {
  //     if (menu._id === action.payload.updatedMenu._id) {
  //       return action.payload.updatedMenu;
  //     } else {
  //       return menu;
  //     }
  //   });
  //   state.menuMessage = `Tu as modifié le plat "${action.payload.updatedMenu.name}"`;
  // })
  // .addCase(updateMenu.rejected, (state, action) => {
  //   state.menuLoading = false;
  //   state.menuError = true;
  //   state.menuMessage = action.payload;
  // })
  // .addCase(deleteMenu.pending, (state) => {
  //   state.menuLoading = true;
  // })
  // .addCase(deleteMenu.fulfilled, (state, action) => {
  //   state.menuLoading = false;
  //   state.menuSuccess = true;
  //   state.menus = state.menus.filter(
  //     (menus) => menus._id !== action.payload.id
  //   );
  //   state.menuMessage = `Tu as supprimer le plat "${action.payload.name}"`;
  // })
  // .addCase(deleteMenu.rejected, (state, action) => {
  //   state.menuLoading = false;
  //   state.menuError = true;
  //   state.menuMessage = action.payload;
  // }),
});

export const { resetMenuState } = menuSlice.actions;

export default menuSlice.reducer;

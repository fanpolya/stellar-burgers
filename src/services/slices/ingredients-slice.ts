import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

interface IngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
}

export const initialState: IngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        console.error('Failed to fetch ingredients:', action.error.message);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;

        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectSauces = (state: RootState) => state.ingredients.sauces;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../store';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectBun = (state: RootState) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
export const selectConstructorItems = createSelector(
  [(state: RootState) => state.burgerConstructor],
  (constructorState) => ({
    bun: constructorState?.bun || null,
    ingredients: constructorState?.ingredients || []
  })
);
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;

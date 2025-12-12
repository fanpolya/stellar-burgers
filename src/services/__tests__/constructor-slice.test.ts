import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../slices/constructor-slice';

import type { ConstructorState } from '../slices/constructor-slice';
import type { TConstructorIngredient } from '@utils-types';

describe('burgerConstructor slice', () => {
  const bun: TConstructorIngredient = {
    id: 'test-bun',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ing1: TConstructorIngredient = {
    id: 'test-ing-1',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ing2: TConstructorIngredient = {
    id: 'test-ing-2',
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавлять булку', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавлять ингредиент в список', () => {
    const state = reducer(initialState, addIngredient(ing1));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ing1);
  });

  it('должен удалять ингредиент по id', () => {
    const startState: ConstructorState = {
      bun: null,
      ingredients: [ing1, ing2]
    };

    const state = reducer(startState, removeIngredient('test-ing-1'));
    expect(state.ingredients).toEqual([ing2]);
  });

  it('должен поднимать ингредиент вверх', () => {
    const startState: ConstructorState = {
      bun: null,
      ingredients: [ing1, ing2]
    };

    const state = reducer(startState, moveIngredientUp(1));

    expect(state.ingredients).toEqual([ing2, ing1]);
  });

  it('должен опускать ингредиент вниз', () => {
    const startState: ConstructorState = {
      bun: null,
      ingredients: [ing1, ing2]
    };

    const state = reducer(startState, moveIngredientDown(0));

    expect(state.ingredients).toEqual([ing2, ing1]);
  });

  it('должен очищать конструктор', () => {
    const startState: ConstructorState = {
      bun: bun,
      ingredients: [ing1, ing2]
    };

    const state = reducer(startState, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});

import reducer, { initialState, getIngredients } from '../slices/ingredients-slice';
import { TIngredient } from '@utils-types';

export const mockIngredients: TIngredient[] = [
  {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png"
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png"
  },
  {
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png"
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png"
  },
  {
    "_id": "643d69a5c3f7b9001cfa0943",
    "name": "Соус фирменный Space Sauce",
    "type": "sauce",
    "proteins": 50,
    "fat": 22,
    "carbohydrates": 11,
    "calories": 14,
    "price": 80,
    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png"
  }
];

describe('ingredients slice', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('должен обработать getIngredients.pending', () => {
    const nextState = reducer(initialState, getIngredients.pending('', undefined));
    expect(nextState.isLoading).toBe(true);
  });

  it('должен обработать getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const nextState = reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.ingredients).toHaveLength(5);
    expect(nextState.buns).toHaveLength(1);
    expect(nextState.mains).toHaveLength(2);
    expect(nextState.sauces).toHaveLength(2);
  });

  it('должен обработать getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const nextState = reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
  });
});

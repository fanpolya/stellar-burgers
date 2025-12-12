import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(Object.keys(state)).toEqual([
      'ingredients',
      'burgerConstructor',
      'order',
      'orders',
      'feed',
      'user'
    ]);

    expect(state.ingredients).toBeDefined();
    expect(state.burgerConstructor).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.orders).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.user).toBeDefined();
  });
});

import store from '../store';

describe('rootReducer', () => {
  it('должен корректно инициализироваться', () => {
    const state = store.getState();

    expect(state).toBeDefined();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });
});

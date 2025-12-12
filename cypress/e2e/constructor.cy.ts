const TEST_URL = 'http://localhost:4000';
const addButton = 'button:contains("Добавить")';

const SELECTORS = {
  constructor: '[data-cy="burger-constructor"]',
  ingredient: '[data-cy="ingredient"]',
  orderButton: '[data-cy="order-button"]',
  modal: '[data-cy="modal"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  closeButton: '[data-cy="close-button"]',
  orderNumber: '[data-cy="order-number"]'
};

const INGREDIENTS = {
  bun: 'Краторная булка N-200i',
  main: 'Биокотлета из марсианской Магнолии',
  sauce: 'Соус Spicy-X'
};

describe('Stellar Burger Constructor', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    // Моки API
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.intercept('POST', '/api/auth/token', {
      fixture: 'refresh-token.json'
    }).as('refreshToken');

    // Симуляция авторизации
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit(TEST_URL, {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });

    cy.wait('@getIngredients');

    cy.get(SELECTORS.constructor).should('exist').as('constructorArea');
    cy.get(SELECTORS.ingredient).as('ingredientsList');
    cy.get(SELECTORS.orderButton).as('orderButton');

    cy.get('@ingredientsList').contains(INGREDIENTS.bun).parent().as('bunItem');
    cy.get('@ingredientsList').contains(INGREDIENTS.main).parent().as('mainItem');
    cy.get('@ingredientsList').contains(INGREDIENTS.sauce).parent().as('sauceItem');
  });

  describe('Добавление ингредиентов', () => {
    it('добавление булки и начинки в конструктор', () => {
      cy.get('@bunItem').find(addButton).click();
      cy.get('@mainItem').find(addButton).click();

      cy.get('@constructorArea').should('contain', INGREDIENTS.bun);
      cy.get('@constructorArea').should('contain', INGREDIENTS.main);
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('открытие и закрытие модалки', () => {
      cy.get('@mainItem').click();
      cy.get(SELECTORS.modal).should('exist');

      cy.get(SELECTORS.closeButton).click();
      cy.get(SELECTORS.modal).should('not.exist');

      cy.get('@mainItem').click();
      cy.get(SELECTORS.modalOverlay).click({ force: true });
      cy.get(SELECTORS.modal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('создание заказа и проверка номера', () => {
      cy.get('@bunItem').find(addButton).click();
      cy.get('@mainItem').find(addButton).click();
      cy.get('@sauceItem').find(addButton).click();

      cy.get('@orderButton').should('not.be.disabled').click();

      cy.wait('@createOrder');

      cy.get(SELECTORS.modal).should('be.visible');
      cy.get(SELECTORS.orderNumber).should('contain', '12345');

      cy.get(SELECTORS.closeButton).click();
      cy.get(SELECTORS.modal).should('not.exist');

      cy.get('@constructorArea').should('contain', 'Выберите булки');
      cy.get('@constructorArea').should('contain', 'Выберите начинку');
    });
  });
});

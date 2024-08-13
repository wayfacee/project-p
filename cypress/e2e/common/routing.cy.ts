import { selectByTestId } from "../../helpers/selectByTestId";

describe('template spec', () => {
  describe('user is not authed', () => {
    it('переход на гл. стр.', () => {
      cy.visit('/');
      // 1) chainer 
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('переход на стр. профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('переход на не сущ. маршрут', () => {
      cy.visit('/sdfdsa');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('user is authed', () => {
    beforeEach(() => {
      // user and password хранить
      // от юзеров - тестовых, 2) секюрно,
      // в секретнице, в env, так чтоб
      // в коде просто не лежали
      cy.login('admin', '123');
    });

    it('переход на стр. профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('переход на стр. статьей', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
})
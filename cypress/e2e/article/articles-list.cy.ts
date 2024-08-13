describe('юзер заходит на стр. со списком статьей', () => {
  beforeEach(() => {
    cy.login().then(data => {
      cy.visit('articles');
    })
  });


  it('и статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('на стабах (фиктсурах)', () => {
    // стабы - синоним моков, фейковый зараенее подготов. данные, 
    // которые можно напр исп. для тестов
    // ? Дальше уже парамсы
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('example of the skipped test', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    cy.getByTestId('ssss').should('exist');
  });
});
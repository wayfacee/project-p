let currentArticleId = '';
// let currentCommentId = '';

describe('юзер заходит на стр. статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      // cy.log(JSON.stringify(article));
      cy.visit(`articles/${article.id}`);
    });
  });

  // Создали статью - протестили все что нужно - удалили статью
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('и видит содержимое статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('и видит список рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationList').should('exist');
  });

  it('и оставляет коммент.', () => {
    cy.getByTestId('ArticleDetails.Info');
    // скроллим до AddCommentForm
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('и ставит оценку', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    // data-selected={currentStarsCount >= starNumber
    cy.get('[data-selected=true]').should('have.length', 5);
  });

  it('и ставит оценку (пример на фикстурах)', () => {
    // 2) на что вешаем, юрл 3) в качестве фикструы исп. (ответы бэка)
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    // data-selected={currentStarsCount >= starNumber
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});

export const addComment = (text: string) => {
  cy.getByTestId('AddCommentForm.Input').type(text);
  cy.getByTestId('AddCommentForm.Button').click();
};

export const removeComment = (commentId: string) => {
  return cy.request({
    // если json-server не удаляет все чо связано
    // с артиклом, то надо самому удалять
    method: 'DELETE',
    url: `http://localhost:8000/comments/${commentId}`,
    headers: { Authorization: 'asdfg' },
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: string): Chainable<void>;
      removeComment(commentId: string): Chainable<void>
    }
  }
}
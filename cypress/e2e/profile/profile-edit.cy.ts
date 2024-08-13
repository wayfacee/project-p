let profileId = '';

describe('юзер заходит на стр. профиля', () => {
  beforeEach(() => {
    cy.visit('profile');
    cy.login().then(data => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  })

  it('и успешно загружается', () => {
    // по хоршему надо проверять наличие знач в инпутах итд.
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
  });
  
  it('и редактирует его', () => {
    const newName = 'new';
    const newLastname = 'lastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
})
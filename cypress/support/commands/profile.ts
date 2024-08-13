export const updateProfile = (firstname: string, lastname: string) => {
  // описывает только действия, а в тесткейе делаем проверки
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// чтобы могли тест прогонять неогран. колл. раз
// чтоб выполн. кд раз одинаково, с одними и теми же данными
export const resetProfile = (profileId: string) => {
  // через интерфейс не над, тк бизнесового сценария сборса профиля нет
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asdfg' }, // чтобы юзер был авторизован
    body: {
      "id": "4",
      "first": "test",
      "lastname": "user",
      "age": 34,
      "currency": "USD",
      "country": "Kyrgyzstan",
      "city": "Moscow",
      "username": "testuser",
      "avatar": "https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg"
    }
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
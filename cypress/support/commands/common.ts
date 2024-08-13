import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { User } from '../../../src/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

/** общие команды, которые не применимы к конкрет бизнес сущ. */
export const login = (
  username: string = 'testuser',
  password: string = '123',
) => {
  return cy
    .request({
      method: 'POST',
      url: `http://localhost:8000/login`,
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
      return body; // получаем - возв. данные
    });
};

// import вызывать не удобно
export const getByTestId = (testId: string) => {
  return cy.get(selectByTestId(testId));
  // usage: cy.getByTestId('ProfileCard.firstname')
};

// набор некоторого функц., который можем зашить внутрь cypressa
// и в нужных местах исп.
// -- храним рядом с функцией
declare global {
  namespace Cypress {
    interface Chainable {
      // чтобы автокомпл. работал: User
      login(email?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): ReturnType<typeof cy.get>; // Chainable<JQuery<HTMLElement>>; - если не работает
    }
  }
}

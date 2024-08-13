import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };

    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('123123')),
    ).toEqual({ username: '123123' });
  });

  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };

    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('123123')),
    ).toEqual({ password: '123123' });
  });

  // лоадинг и еррор, лучше не над, в слайсе это избыточно
  // потому что мелкие присовения итд.
  // да и вот измен. одно поле, типо юзер, пороль тесты
  // редюсер тест писать избыточно

  // + в логинбайюзернейме уже еррор сделали
});

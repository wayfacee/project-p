import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// возвращает асинксанкэкшен, исп. акшенкриетор, который
// асинксанкэкшен создает, и функц. аргументом принимает
// то что нужно
type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
// не подхватывает функц. по типу mockReturnValue
// 2) глубокий мок, мокаем внутренние поля (пост итд.)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>; // то что возв. mocked
  navigate: jest.MockedFn<any>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    // иниц. стейт, чтобы гетстейт => возв. правильно
    // (?) инишал стейт не нужен во многих сценариях
    state?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;

    // когда создаем кд раз дистпатч, гетстейт
    // в каждом объекте уникальный, свой
    // бефорич не нужен
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);

    // 1) dispatch 2) getState 3) extra
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });

    // тип резулта, тс сам подхватил
    return result;
  }
}

// createAsynThunk => AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
// => AsyncThunkActionCreator<Returned, ThunkArg, ThunkApiConfig>
// => (arg: ThunkArg) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>

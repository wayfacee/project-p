import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

// возвращает асинксанкэкшен, исп. акшенкриетор, который
// асинксанкэкшен создает, и функц. аргументом принимает
// то что нужно
type ActionCreatorType<Return, Arg, RejectedValue>
  = (arg: Arg)
    => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;

    // когда создаем кд раз дистпатч, гетстейт
    // в каждом объекте уникальный, свой
    // бефорич не нужен
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, undefined);

    // тип резулта, тс сам подхватил
    return result;
  }
}

// createAsynThunk => AsyncThunk<Returned, ThunkArg, ThunkApiConfig> 
  // => AsyncThunkActionCreator<Returned, ThunkArg, ThunkApiConfig>
    // => (arg: ThunkArg) => AsyncThunkAction<Returned, ThunkArg, ThunkApiConfig>
import { counterActions, counterReducer } from "./counterSlice";
import { CounterSchema } from "../types/counterSchema";

describe('counterSlice', () => {
  const { incremented, decremented } = counterActions
  test('incremented', () => {
    const state: CounterSchema = { value: 10 };

    expect(
      counterReducer(state, incremented())
    ).toEqual({ value: 11 });
  });

  test('decremented', () => {
    const state: CounterSchema = { value: 10 };

    expect(
      counterReducer(state, decremented())
    ).toEqual({ value: 9 });
  });

  test('should work with empty state', () => {
    expect(
      counterReducer(undefined, incremented())
    ).toEqual({ value: 1 });
  });
});
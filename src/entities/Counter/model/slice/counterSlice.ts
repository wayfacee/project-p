import { CounterSchema } from '../types/counterSchema';
import { buildSlice } from '@/shared/store';

const initialState: CounterSchema = {
  value: 0,
};

const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const {
  actions: counterActions,
  reducer: counterReducer,
  useActions: useCounterActions,
} = counterSlice;

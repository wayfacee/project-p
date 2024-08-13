import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;

  // из за навигейта происходит при обнов. новый рендер
  // НЕЛЬЗЯ ТАК ДЕЛАТЬ!!!
  // напр хотим, чтоб с регистр на => стр профиля
  // const navigate = useNavigate();

  const store = createReduxStore(
    // с as это плохо, но нам надо
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    // navigate,
  );

  return <Provider store={store}>{children}</Provider>;
};

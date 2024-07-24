import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers
  } = props;

  const store = createReduxStore(
    // с as это плохо, но нам надо
    initialState as StateSchema, 
    asyncReducers as ReducersMapObject<StateSchema>
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
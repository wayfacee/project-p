import { useDispatch, useStore } from 'react-redux';
import { FC, ReactNode, useEffect } from "react";
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

// если будет нескока редюсеров
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

// потеряли тип для ключа:
type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterAmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    reducers,
    removeAfterAmount,
    children
  } = props;

  const store = useStore() as ReduxStoreWithManager; // получаем редакс стор
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
      // добавляем редюсер в момент монтирования
      store.reducerManager.add(name, reducer);

      // отслеживаем редюсер, когда иниц:
      dispatch({ type: `@INIT ${name} reducer ` });
    });

    // когда демонтируется реактом, удаляем
    return () => {
      if (removeAfterAmount) {
        Object.entries(reducers).forEach(([name]: ReducerListEntry) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        })
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {children}
    </>
  );
};
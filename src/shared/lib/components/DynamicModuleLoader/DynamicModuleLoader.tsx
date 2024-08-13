import { useDispatch, useStore } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';

// * если дважды открыть модалку, то редюсер иниц. дважды (вроде)
// ДЛЯ ASYNC СHUNK / REDUCERОВ

// если будет нескока редюсеров
export type ReducersList = {
  // делем более строгим, мы забираем поле из стейтСхемы
  // взавис. от того какое навз. у редюсера, разраб указал в качестве нейм
  // динамически на основании этого достает кусочек из стейтСхемы
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
  // сопостлавяем название редюсера(в качестве ключа), с самим
  // редюсером (в качестве знач.)

  // [name] - и мы из стейт схемы по назв. достаем этот редюс.

  // название редюсера не совпадает с самим редюсером
};

// потеряли тип для ключа: уже не нужно
// type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterAmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { reducers, removeAfterAmount = true, children } = props;

  const store = useStore() as ReduxStoreWithManager; // получаем редакс стор
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    // entries - когда достает ключи, по умолч. восп. их стринговыми
    // у любого объекта ключ - всегда string, изменить никак не можем,
    // тока тс проверками итд.
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      // добавляем новый редюс только если его нет
      if (!mounted) {
        // добавляем редюсер в момент монтирования
        // всегда уверны что приходит стейтсхемаки
        store.reducerManager.add(name as StateSchemaKey, reducer);

        // отслеживаем редюсер, когда иниц:
        dispatch({ type: `@INIT ${name} reducer ` });
      }
    });

    // когда демонтируется реактом, удаляем
    return () => {
      if (removeAfterAmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

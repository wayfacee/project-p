import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema";

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers)

  // массив хранит назв. редюсеров, которые хотим удалить
  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,

    // редюсер
    reduce: (state: StateSchema, action: AnyAction) => {
      // если в массиве (keysToRemove) есть какие то ключи, то полнотью удаляем
      if (keysToRemove.length > 0) {
        state = { ...state }
        keysToRemove.forEach(key => {
          delete state[key];
        })
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      // @ts-ignore
      return combinedReducer(state, action)
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }

      // по ключу добавляют новый редюсер
      reducers[key] = reducer

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    },

    // Removes a reducer with the specified key
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      // удаляет
      delete reducers[key]

      // добавляет ключ в массив
      keysToRemove.push(key)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    }
  }
}
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

/**
 * избавляем от useSelector
 */

// то чо возв., генриком будет подхв. и автоматом. типиз.
// any[] - mb string, number etc.
type Selector<T, Args extends any[]> = (
  state: StateSchema,
  ...args: Args
) => T;
// чтоб автомкомплит подхватывал + резалт затипизирован
// в хуке не указаны аргы, чтобы было все по красоте
// надо исп. генерики, чтобы тс подхватывал типы которые передаем 10стр.
type Hook<T, Args extends any[]> = (...args: Args) => T;
// Hook<T, Args> - то что принимает функц.
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends any[]>(
  selector: Selector<T, Args>,
): Result<T, Args> {
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: StateSchema) => selector(state, ...args));
  }; 

  // 1) hook - внутри комп. (можем дать любое назв.)
  // 2) сам селектор (use in async thunk, helpers etc.)
  return [useSelectorHook, selector];
}
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

/**
 * избавляем от useSelector
 */

// то чо возв., генриком будет подхв. и автоматом. типиз.
type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
  const useSelectorHook = () => {
    return useSelector(selector);
  };

  // 1) hook - внутри комп. (можем дать любое назв.)
  // 2) сам селектор (use in async thunk, helpers etc.)
  return [useSelectorHook, selector];
}

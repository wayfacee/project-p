import { useDispatch, useSelector } from "react-redux";
import { decremented, incremented } from "../model/slice/counterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const {t} = useTranslation();

  const increment = () => {
    dispatch(incremented());
  };

  const decrement = () => {
    dispatch(decremented());
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <button data-testid='increment-btn' onClick={increment}>{t('increment')}</button>
      <button data-testid='decrement-btn' onClick={decrement}>{t('decrement')}</button>
    </div>
  );
};
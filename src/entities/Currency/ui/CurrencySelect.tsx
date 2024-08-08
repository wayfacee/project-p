import { useTranslation } from "react-i18next";
import { Currency } from "../model/types/currency";
import { memo, useCallback } from "react";
import { ListBox } from "shared/ui/Popups/ui/ListBox/ListBox";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

// тк. массив статичный, и не зависит. от просов, стейта итд.
// ссылка будет одна и та же, юзмемо не нужен
const options = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
  const { t } = useTranslation();

  // карренси и стринг не соответсвие
  // автоматом. должен енамы мапить со стр. (но видимо ошибки)
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      value={value}
      items={options}
      defaultValue={t('Укажите валюту')}
      label={t('Укажите валюту')}
      readonly={readonly}
      direction="top right"
    />
  )
});
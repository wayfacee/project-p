import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Country } from '../model/types/country';
import { ListBox } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Kyrgyzstan, content: Country.Kyrgyzstan },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Armenia, content: Country.Armenia },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        className={className}
        onChange={onChangeHandler}
        value={value}
        defaultValue={t('Укажите страну')}
        label={t('Укажите страну')}
        items={options}
        readonly={readonly}
        direction="top right"
      />
    );
  },
);

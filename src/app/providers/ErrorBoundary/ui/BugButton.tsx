import { Button } from '@/shared/ui/deprecated/Button/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Комп. для тестов
export const BugButton = () => {
  const [error, setError] = useState(false);
  const onThrow = () => setError(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  return <Button onClick={onThrow}>{t('throw error')}</Button>;
};

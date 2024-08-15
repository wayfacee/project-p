import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/widgets/Modal';
import { Text } from '@/shared/ui/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlesPageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      // чтоб модалка не вспывала, при след. заходе:
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('Добро пожаловать на страницу статьей')}
      text={t(
        'Здесь вы можете искать и просмтратривать статьи на различные темы',
      )}
    />
  );

  if (isMobile) {
    return <Drawer>{text}</Drawer>;
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});

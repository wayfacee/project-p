import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit?: () => void;
}

// не обороч. на кард, чтобы был переисп
export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
      <VStack gap="32" className={classNames('', {}, [className])}>
        <HStack gap="8">
          {/** avatar много исп. с юзернеймом, можно было сделать как отдел. пропс для аватара  + HStack */}
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        {/** ArticleEditButton - можно было создать такую фичу */}
        <Button onClick={onEdit}>{t('Редактировать')}</Button>
        <Text text={t('{{count}} просмотров', {count: views})} />
      </VStack>
    );
  },
);

// напр: 1 просмотр, 2 простмотра, 3 просмотров
import { classNames } from '@/shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileRating } from '@/features/profileRating';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';

interface ProfilePageProps {
  className?: string;
}

// нужно создать фичу, которая будет содержать обработку итд.

const ProfilePage = ({ className }: ProfilePageProps) => {
  // надо чтобы ид передовался, пропсом, пошта эдитабле можем исп. нескока раз
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id) {
    return <Text title={t('Статья не найдена')} />;
  }

  return (
    <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
        <ProfileRating profileId={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;

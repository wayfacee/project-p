import { classNames } from "shared/lib/classNames/classNames";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { EditableProfileCard } from "features/editableProfileCard";
import { VStack } from "shared/ui/Stack";

interface ProfilePageProps {
  className?: string;
}

// нужно создать фичу, которая будет содержать обработку итд.

const ProfilePage = ({ className }: ProfilePageProps) => {
  // надо чтобы ид передовался, пропсом, пошта эдитабле можем исп. нескока раз
  const { id } = useParams<{ id: string }>();

  // if (!id) {
  //   return <Text title={t('Статья не найдена')} />
  // }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack max gap="16">
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
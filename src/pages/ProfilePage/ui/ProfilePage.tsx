import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { profileReducer } from "enteties/Profile";

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAmount>
      <div className={classNames('', {}, [className])}>
        ss
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
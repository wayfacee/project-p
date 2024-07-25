import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ProfileCard.module.scss';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text } from "shared/ui/Text/Text";

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(cl.ProfileCard, {}, [className])}>
      <div className={cl.header}>
        <Text title={t('Профиль')} />

        <Button className={cl.editBtn} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      </div>

    <div className={cl.data}>
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cl.input}
        />

        <Input
          value={data?.lastname}
          placeholder={t('Ваше фамилия')}
          className={cl.input}
        />
      </div>
    </div>
  );
};
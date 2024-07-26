import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './ProfilePageHeader.module.scss';
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getProfileReadonly, profileActions, updateProfileData } from "enteties/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);
  
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cl.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />

      {readonly ? (
        <Button 
        className={cl.editBtn} 
        theme={ButtonTheme.OUTLINE}
        onClick={onEdit}
        >
          {t('Редактировать')}
        </Button>
      ) : (
        <>
        <Button 
        className={cl.editBtn} 
        theme={ButtonTheme.OUTLINE_RED}
        onClick={onCancelEdit}
        >
          {t('Отменить')}
        </Button>

        <Button 
        className={cl.saveBtn} 
        theme={ButtonTheme.OUTLINE}
        onClick={onSave}
        >
          {t('Сохранить')}
        </Button>
        </>
      )}
    </div>
  );
};
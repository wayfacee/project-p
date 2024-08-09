import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getUserAuthData } from "@/entities/User";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updataProfileData/updateProfileData";
import { HStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
  const {
    className
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  // можно было бы сделать отдел. селектор, и заюзать ауз+профиль Дату,
  // и вернуть знач проверки. избавились бы от лишних строк кода
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

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
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />

      {canEdit && (
        <>
          {readonly ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
              data-testid={`EditableProfileCardHeader.EditButton`}
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
                data-testid={`EditableProfileCardHeader.CancelButton`}
              >
                {t('Отменить')}
              </Button>

              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
                data-testid={`EditableProfileCardHeader.SaveButton`}
              >
                {t('Сохранить')}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  );
});
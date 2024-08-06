import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { fetchProfileData, getProfileError, getProfileIsLoading, getProfileReadonly, getValidateErrors, profileActions, ProfileCard, profileReducer, ValidateProfileError } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { getProfileForm } from "entities/Profile/model/selectors/getProfileForm/getProfileForm";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack/VStack/Vstack";

const reducers: ReducersList = {
  profile: profileReducer,
}

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');
  //  чтобы с асинх. экшеном работать
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getValidateErrors);
  const { id } = useParams<{ id: string }>();

  // мапинг
  const validateErrorTranslates = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возвраст'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректная валюта'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион | страна'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранений'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  })

  // тк передаем кк пропсы, поэтому каллбэк
  // в реал. прилож будет валидация, логика итд.
  // а так на отдел. части, отдел. функц.
  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }))
  }, [dispatch]);

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }))
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    // eslint-disable-next-line no-useless-escape
    const reg = new RegExp('^\d+$')
    if (value?.match(reg)) {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
    } else {
      dispatch(profileActions.setReadonly(true));
    }
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }))
  }, [dispatch]);

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }))
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }))
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }))
  }, [dispatch]);

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }))
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterAmount>
      <Page className={classNames('', {}, [className])}>
        <VStack max gap="16">
          <ProfilePageHeader />

          {validateErrors?.length && (
            validateErrors.map(err => (
              <Text
                theme={TextTheme.ERROR}
                text={validateErrorTranslates[err]}
                key={err}
              />
            ))
          )}

          <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
          />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
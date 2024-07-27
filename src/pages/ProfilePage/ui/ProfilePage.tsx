import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { fetchProfileData, getProfileError, getProfileIsLoading, getProfileReadonly, getValidateErrors, profileActions, ProfileCard, profileReducer, ValidateProfileError } from "enteties/Profile";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { getProfileForm } from "enteties/Profile/model/selectors/getProfileForm/getProfileForm";
import { Currency } from "enteties/Currency";
import { Country } from "enteties/Country";
import { Text, TextTheme } from "shared/ui/Text/Text";

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

  // мапинг
  const validateErrorTranslates = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возвраст'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректная валюта'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион | страна'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранений'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
  }

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      // ошибка в навигейте
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

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
      <div className={classNames('', {}, [className])}>
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
      </div>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
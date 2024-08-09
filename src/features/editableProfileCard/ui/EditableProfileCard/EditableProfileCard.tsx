import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getValidateErrors } from '../../model/selectors/getValidateErrors/getValidateErrors';
import { ValidateProfileError } from "@/features/editableProfileCard/model/consts/consts";
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { ProfileCard } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from '@/shared/ui/Stack';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const {
    className,
    id,
  } = props;
  const { t } = useTranslation('profile');

  //  чтобы с асинх. экшеном работать
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getValidateErrors) as ValidateProfileError[];


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
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap='8' max
        className={classNames('', {}, [className])}
      >
        <EditableProfileCardHeader />

        {validateErrors?.length && (
          validateErrors.map(err => (
            <Text
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
              key={err}
              // главный дататесид.то что тестируем 
              data-testid='EditableProfileCard.Error'
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
    </DynamicModuleLoader>

  );
});
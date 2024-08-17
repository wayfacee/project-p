import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './ProfileCardDeprecated.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { BeatLoader } from 'react-spinners';
import {
  TextAlign,
  Text as TextDeprecated,
  TextTheme,
} from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');
  
  return (
    <HStack
      justify={'center'}
      max
      className={classNames(cl.ProfileCard, {}, [cl.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке профиля')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.LEFT}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(cl.ProfileCard, {}, [cl.loading])}
    >
      <BeatLoader color="#f48dff" />
    </HStack>
  );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cl.editing]: !readonly,
  };

  return (
    <VStack
      className={classNames(cl.ProfileCard, mods, [className])}
      gap="8"
      justify="center"
      max
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <AvatarDeprecated src={data?.avatar} alt="Avatar image" />
        </HStack>
      )}

      <InputDeprecated
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
        // по хорошему надо проверить все инпуты
        data-testid={'ProfileCard.firstname'}
      />

      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Ваше фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid={'ProfileCard.lastname'}
      />

      <InputDeprecated
        value={data?.age}
        placeholder={t('Ваш возвраст')}
        onChange={onChangeAge}
        readonly={readonly}
      />

      <InputDeprecated
        value={data?.city}
        placeholder={t('Ваш город')}
        onChange={onChangeCity}
        readonly={readonly}
      />

      <InputDeprecated
        value={data?.username}
        placeholder={t('имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
      />

      <InputDeprecated
        value={data?.avatar}
        placeholder={t('ссылку на аватар')}
        onChange={onChangeAvatar}
        readonly={readonly}
      />

      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />

      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
});

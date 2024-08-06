import { classNames, Mods } from "shared/lib/classNames/classNames";
import * as cl from './ProfileCard.module.scss';
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Profile } from "../../model/types/profile";
import { BeatLoader } from "react-spinners";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country } from "entities/Country/model/types/country";
import { CountrySelect } from "entities/Country";
import { HStack, VStack } from "shared/ui/Stack";
// slice entety мало обладает каким-то своим состоянием,
// в основном - запрос комп тип итд.

// профайлкард не будет завязан конкрт. стейте
// можно передавать из вне

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  // (?) - чтобы было удобно в сторибуке
  onChangeFirstname?: (value: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
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

  if (isLoading) {
    return (
      <HStack className={classNames(cl.ProfileCard, {}, [className, cl.loading])}>
        <BeatLoader color="#f48dff" />
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack justify={'center'} max className={classNames(cl.ProfileCard, {}, [className, cl.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.LEFT}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cl.editing]: !readonly,
  }

  return (
    <VStack
      className={classNames(cl.ProfileCard, mods, [className])}
      gap="8"
      max
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data?.avatar} alt='Avatar image' />
        </HStack>
      )}

      <Input
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
      />

      <Input
        value={data?.lastname}
        placeholder={t('Ваше фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
      />

      <Input
        value={data?.age}
        placeholder={t('Ваш возвраст')}
        onChange={onChangeAge}
        readonly={readonly}
      />

      <Input
        value={data?.city}
        placeholder={t('Ваш город')}
        onChange={onChangeCity}
        readonly={readonly}
      />

      <Input
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
      />

      <Input
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
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
};
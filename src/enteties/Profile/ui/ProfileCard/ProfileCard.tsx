import { classNames, Mods } from "shared/lib/classNames/classNames";
import * as cl from './ProfileCard.module.scss';
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Profile } from "../../model/types/profile";
import { BeatLoader } from "react-spinners";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "enteties/Currency";
import { Country } from "enteties/Country/model/types/country";
import { CountrySelect } from "enteties/Country";
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
      <div className={classNames(cl.ProfileCard, {}, [className, cl.loading])}>
        <BeatLoader color="#f48dff" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cl.ProfileCard, {}, [className, cl.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.LEFT}
        />
      </div>
    )
  }

  const mods: Mods = {
    [cl.editing]: !readonly,
  }

  return (
    <div className={classNames(cl.ProfileCard, mods, [className])}>
      <div className={cl.data}>
        {data?.avatar && (
          <div className={cl.avatarWrapper}>
            <Avatar src={data?.avatar} alt='Avatar image' />
          </div>
        )}

        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cl.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />

        <Input
          value={data?.lastname}
          placeholder={t('Ваше фамилия')}
          className={cl.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />

        <Input
          value={data?.age}
          placeholder={t('Ваш возвраст')}
          className={cl.input}
          onChange={onChangeAge}
          readonly={readonly}
        />

        <Input
          value={data?.city}
          placeholder={t('Ваш город')}
          className={cl.input}
          onChange={onChangeCity}
          readonly={readonly}
        />

        <Input
          value={data?.username}
          placeholder={t('Введите имя пользователя')}
          className={cl.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />

        <Input
          value={data?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          className={cl.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />

        <CurrencySelect
          className={cl.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />

        <CountrySelect
          className={cl.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />

      </div>
    </div>
  );
};
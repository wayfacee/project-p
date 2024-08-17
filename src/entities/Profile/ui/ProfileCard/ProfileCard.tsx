import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
  Text as TextDeprecated,
  TextAlign,
  TextTheme,
} from '@/shared/ui/deprecated/Text/Text';
import { Profile } from '../../model/types/profile';
import { BeatLoader } from 'react-spinners';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/const/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedLoader,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';
// slice entety мало обладает каким-то своим состоянием,
// в основном - запрос комп тип итд.

// профайлкард не будет завязан конкрт. стейте
// можно передавать из вне

export interface ProfileCardProps {
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
  const { className, isLoading, error } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedLoader />}
        off={<ProfileCardDeprecatedLoader />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};

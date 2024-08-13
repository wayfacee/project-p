import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import {
  useGetProfileRating,
  useRateProfile,
} from '../../api/profileRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { RatingCard } from '@/entities/Rating';

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetProfileRating({
    userId: userData?.id ?? '',
    profileId,
  });
  const [rateProfileMutation] = useRateProfile();
  const rating = data?.[0];
  console.log(data);

  const handleRateProfile = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateProfileMutation({
          userId: userData?.id ?? '',
          profileId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log('handleRateProfile', e);
      }
    },
    [profileId, rateProfileMutation, userData?.id],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateProfile(starsCount, feedback);
    },
    [handleRateProfile],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateProfile(starsCount);
    },
    [handleRateProfile],
  );

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />;
  }

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={t('Оцените профиль')}
      feedbackTitle={t('Оставьте свой отзыв о профиле')}
      hasFeedback
      className={className}
    />
  );
});

export default ProfileRating;

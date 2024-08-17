import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating/StarRating';
import { Modal } from '@/widgets/Modal';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number; // колл. звезд которое юзер выбрал.
}

// ЗАДАЧА СДЕЛАТЬ ТАК ЧТОБЫ КОМП. БЫЛ ПЕРЕИСП.
// не привязана к бизнес сущ.

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title,
    rate = 0,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // с редаксом не взаимод.: весь стейт локал., взаимодействовать
  // будет по средствам каллбэков onAccept and onCancel
  // с помощью них данные на вверх отдавать будет

  // а фичи которые будут исп., будут иметь стейт, отпр бэк итд.
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      // saving counts of stars
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, starsCount, onAccept]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [starsCount, onCancel]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            placeholder={t('Ваш отзыв')}
            onChange={setFeedback}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            placeholder={t('Ваш отзыв')}
            onChange={setFeedback}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
          off={
            <TextDeprecated
              title={starsCount ? t('Спасибо за оценку!') : title}
            />
          }
        />

        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}

            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <HStack max gap="16" justify="end">
                  <Button
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    variant="outline"
                  >
                    {t('Закрыть')}
                  </Button>

                  <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t('Отправить')}
                  </Button>
                </HStack>
              }
              off={
                <HStack max gap="16" justify="end">
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    theme={ButtonTheme.OUTLINE_RED}
                  >
                    {t('Закрыть')}
                  </ButtonDeprecated>

                  <ButtonDeprecated
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t('Отправить')}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack>
            {modalContent}
            <ToggleFeatures
              feature="isAppRedesigned"
              on={
                <Button onClick={acceptHandle} size="l" fullWidth>
                  {t('Отправить')}
                </Button>
              }
              off={
                <ButtonDeprecated
                  onClick={acceptHandle}
                  size={ButtonSize.L}
                  fullWidth
                >
                  {t('Отправить')}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card max padding="24" border="partial">
          {content}
        </Card>
      }
      off={
        <CardDeprecated
          data-testid="RatingCard"
          className={className}
          fullWidth
        >
          {content}
        </CardDeprecated>
      }
    />
  );
});

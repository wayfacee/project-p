import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './RatingCard.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback, useState } from "react";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StartRating/StarRating";
import { Modal } from "@/widgets/Modal/Modal";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
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
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // с редаксом не взаимод.: весь стейт локал., взаимодействовать
  // будет по средствам каллбэков onAccept and onCancel
  // с помощью них данные на вверх отдавать будет

  // а фичи которые будут исп., будут иметь стейт, отпр бэк итд.
  const [starsCount, setStarsCount] = useState(0);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    // saving counts of stars
    setStarsCount(selectedStarsCount);

    if (hasFeedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, starsCount, onAccept]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [starsCount, onCancel]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        placeholder={t('Ваш отзыв')}
        onChange={setFeedback}
      />
    </>
  )

  return (
    <div className={classNames(cl.RatingCard, {}, [className])}>
      <VStack align="center" gap="8">
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}

            <HStack max gap="16" justify="end">
              <Button
                onClick={cancelHandle}
                theme={ButtonTheme.OUTLINE_RED}
              >
                {t('Закрыть')}
              </Button>

              <Button
                onClick={acceptHandle}
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack>
            {modalContent}

            <Button
              onClick={acceptHandle}
              size={ButtonSize.L}
              fullWidth
            >
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </div>
  );
});
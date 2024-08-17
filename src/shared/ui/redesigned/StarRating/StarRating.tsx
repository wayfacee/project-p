import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './StarRating.module.scss';
import { memo, useState } from 'react';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface StartRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StartRatingProps) => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;

  // направленную и предыд. звезды, подсвечивать:
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  // если польз. уже колл. звезд выбрал 0 - false, 1+ - true
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  // по скоку итерируемся по массиву, то для кд звезды
  // не получится без замыкания указывать номер звезды
  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      // на какую направил:
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  // чтобы могли на вверх прокинуть
  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => cl.StartRating,
    on: () => cl.StartRatingRedesigned,
  });

  return (
    <div className={classNames(mainClass, {}, [className])}>
      {stars.map((starNumber) => {
        const isHovered = currentStarsCount >= starNumber;

        const commonProps = {
          className: classNames(
            cl.starIcon,
            {
              [cl.hovered]: isHovered,
              [cl.selected]: isSelected,
            },
            [],
          ),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': isHovered,
        };

        return (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </div>
  );
});

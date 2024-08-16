import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './StarRating.module.scss';
import { memo, useState } from 'react';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

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

  return (
    <div className={classNames(cl.StartRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(
            cl.starIcon,
            {
              [cl.hovered]: currentStarsCount >= starNumber,
              [cl.selected]: isSelected,
            },
            [],
          )}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={30}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarsCount >= starNumber}
        />
      ))}
    </div>
  );
});

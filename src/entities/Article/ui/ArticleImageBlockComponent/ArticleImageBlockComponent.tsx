import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleImageBlockComponent.module.scss';
import { memo } from 'react';
import { ArticleImageBlock } from '../../model/types/article';
import {
  Text as TextDeprecated,
  TextAlign,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(cl.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cl.img} />

        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text text={block.title} align={TextAlign.CENTER} />}
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
          />
        )}
      </div>
    );
  },
);

import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleTextBlockComponent.module.scss';
import { memo } from 'react';
import { ArticleTextBlock } from '../../model/types/article';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cl.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text title={block.title} className={cl.title} />}
            off={<TextDeprecated title={block.title} className={cl.title} />}
          />
        )}

        {/* тк параграфы не будут меняться */}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text key={paragraph} text={paragraph} className={cl.paragraph} />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cl.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);

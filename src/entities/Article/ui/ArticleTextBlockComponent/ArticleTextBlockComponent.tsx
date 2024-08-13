import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ArticleTextBlockComponent.module.scss';
import { memo } from 'react';
import { ArticleTextBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/Text/Text';

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
        {block.title && <Text title={block.title} className={cl.title} />}

        {/* тк параграфы не будут меняться */}
        {block.paragraphs.map((paragraph) => (
          <Text key={paragraph} text={paragraph} className={cl.paragraph} />
        ))}
      </div>
    );
  },
);

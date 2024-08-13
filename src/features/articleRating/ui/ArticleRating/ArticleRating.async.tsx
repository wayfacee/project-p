import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

// не является важным, находится внизу стр.
//  и такие комп. желательно подгруз лениво
const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
  return (
    <Suspense fallback={<Skeleton width={'100%'} height={140} />}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};

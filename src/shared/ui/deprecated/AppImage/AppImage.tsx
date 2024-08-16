import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

// LAZY LOADING OF IMG.
// SKELETON WHILE IMG IS LOADING

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement; // loading
  errorFallback?: ReactElement;
}

/**
 * вскод будет зачеркивать и писать, поч устарели
 * @deprecated
 */
export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    src,
    alt = 'image',
    fallback,
    errorFallback,
    ...otherProps
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  // если ошибка произош, должно отрис.
  const [hasError, setHasError] = useState(false);

  // вызовется еще до того как комп. вмонтируется
  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    // начнется фоновая подгрузка

    // onload - отрабат. когда имг закончило грузится
    img.onload = () => {
      setIsLoading(false);
    };

    // отраб. если возникла ошибка
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return <img src={src} alt={alt} className={className} {...otherProps} />;
});

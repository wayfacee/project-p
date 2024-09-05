import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from '@/widgets/PageError';
import { withTranslation } from 'react-i18next';

// в try catch - не обернули, и ошибку не обработали.
// не отклав. ошибки в ассинх коде / событьях, при сервер сайт рендеринг
// и в самом себе
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// 1)пропс 2) тип для стейта
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error: Error*/) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // можно еще указ. сервис для логирования
    console.log('sms:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback="">
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
// i18n будет ругаться что не сделали переводы
// usTranslation исп в FC. а в CC такое не прокатит
// и поэтому можем исп. хок (обертка)
// export default withTranslation()(ErrorBoundary)
// но здесь так делать не будем, пошта есть пэйжЕррор
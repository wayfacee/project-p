import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/const/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

const App = () => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    // app router renderится раньше чем мы иниц. данные о юзере,
    // можно было весь комп. не рендер. пока данные о юзере не будут
    dispatch(initAuthData());
  }, [dispatch]);

  // будет выполянться запрос, а раньше мы получали из локал стораже мгновенно
  if (!inited) {
    return <PageLoader />;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div className={classNames('app', {}, [])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              {inited && <AppRouter />}
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>sddd</div>}
            />
          </Suspense>
        </div>
      }
    />
  );
};

export default App;

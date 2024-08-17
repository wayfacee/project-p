import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

const App = () => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    // app router renderится раньше чем мы иниц. данные о юзере,
    // можно было весь комп. не рендер. пока данные о юзере не будут
    dispatch(initAuthData());
    console.log('ушел в сервер');
  }, [dispatch]);

  // будет выполянться запрос, а раньше мы получали из локал стораже мгновенно
  if (!inited) {
    return <PageLoader />;
  }

  return (
    <div className={classNames('app_redesigned', {}, [])}>
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={<div>toolbar</div>}
        />
      </Suspense>
    </div>
  );
};

export default App;

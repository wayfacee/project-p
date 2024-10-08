import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

const App = memo(() => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      // app router renderится раньше чем мы иниц. данные о юзере,
      // можно было весь комп. не рендер. пока данные о юзере не будут
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  // будет выполянться запрос, а раньше мы получали из локал стораже мгновенно
  if (!inited) {
    // инфа о юзере не получена, фича флаги незн. какие вкл.
    // если перекл. тему, то данных какие темы выбр. нет
  return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          // doc.body = theme
          <div id="app" className={classNames('app_redesigned', {}, [])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <div id="app" className={classNames('app_redesigned', {}, [])}>
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
});

export default withTheme(App);
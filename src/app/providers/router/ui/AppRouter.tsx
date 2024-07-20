import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader/ui/PageLoader";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      {/* loading of chunks... */}
      <Routes>
        {routeConfig.map(({ path, element: Element }) =>
          <Route key={path} path={path} element={
            <div className="page-wrapper">
              <Element />
            </div>
          } />
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
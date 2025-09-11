import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppRoutes } from "./lib/common/AppRoutes";
import Layout from "./lib/common/ui/Layout";
import { ThemeProvider } from "./lib/common/ui/theme/ThemeProvider";
import { TooltipProvider } from "./lib/common/ui/tooltip/TooltipProvider";
import ToastHost from "./lib/common/ui/ToastHost";
import NotFound from "./pages/NotFound";

type RoutesMap = typeof AppRoutes;
type Key = keyof RoutesMap;

export default function App() {
  const routes = (Object.keys(AppRoutes) as Key[]).filter(key => AppRoutes[key].isParent);
  return (
    <ThemeProvider>
      <TooltipProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout/>}> 
              {routes.map(key => {
                  const route = AppRoutes[key];
                  const visibleChildren = (route.children || [])
                    .map(childKey => AppRoutes[childKey])
                    .filter(childRoute => childRoute.shouldBeDisplayed !== false);
                  const defaultChild = visibleChildren[0];
                  return (
                    <Route key={route.id} path={route.path} element={route.element}>
                      {visibleChildren.length > 0 && (
                        <Route index element={<Navigate to={defaultChild.path} replace />} />
                      )}
                      {route.children &&
                        route.children.map(childKey => {
                          const childRoute = AppRoutes[childKey];
                          return <Route key={childRoute.id} path={childRoute.path} element={childRoute.element} />;
                        })}
                    </Route>
                  );
                })}
              {/* Catch-all for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
        <ToastHost/>
      </TooltipProvider>
    </ThemeProvider>
  );
}

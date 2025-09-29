import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppRoutes } from "./lib/common/AppRoutes";
import Layout from "./lib/common/ui/Layout";
import NotFound from "./pages/NotFound";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { ThemeProvider, Toast } from "@polyutils/components";

type RoutesMap = typeof AppRoutes;
type Key = keyof RoutesMap;

export default function App() {
  const routes = (Object.keys(AppRoutes) as Key[]).filter(key => AppRoutes[key].isParent);
  return (
    <ThemeProvider>
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
      <Toast theme="colored" pauseOnHover dismissOnClick duration={8000} stacked/>
      <SpeedInsights/>
    </ThemeProvider>
  );
}

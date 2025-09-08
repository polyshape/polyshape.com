import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { AppRoutes } from "./lib/common/AppRoutes";
import Layout from "./lib/common/ui/Layout";
import { ThemeProvider } from "./lib/common/ui/theme/ThemeProvider";
import { TooltipProvider } from "./lib/common/ui/tooltip/TooltipProvider";
import ToastHost from "./lib/common/ui/ToastHost";

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
                  return (
                    <Route key={route.id} path={route.path} element={route.element}>
                      {route.children &&
                        route.children.map(childKey => {
                          const childRoute = AppRoutes[childKey];
                          return <Route key={childRoute.id} path={childRoute.path} element={childRoute.element} />;
                        })}
                    </Route>
                  );
                })}
            </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
        <ToastHost/>
      </TooltipProvider>
    </ThemeProvider>
  );
}

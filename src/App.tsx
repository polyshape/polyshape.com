import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./lib/common/AppRoutes";
import Layout from "./lib/common/ui/Layout";
import { ThemeProvider } from "./lib/common/ui/theme/ThemeProvider";

type RoutesMap = typeof AppRoutes;
type Key = keyof RoutesMap;

export default function App() {
  const routes = (Object.keys(AppRoutes) as Key[]).filter(key => AppRoutes[key].isParent);
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

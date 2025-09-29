import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingProvider, ThemeProvider, Toast } from "@polyutils/components";
import Layout from "../../../src/lib/common/ui/Layout";
import { AppRoutes } from "../../../src/lib/common/AppRoutes";
import { Suspense } from "react";

export function renderLayoutWithProviders(initialPath = "/") {
  type RoutesMap = typeof AppRoutes;
  type Key = keyof RoutesMap;
  const routes = (Object.keys(AppRoutes) as Key[]).filter(key => AppRoutes[key].isParent);
  return render(
    <MemoryRouter initialEntries={[initialPath]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <LoadingProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<Layout />}>
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
              </Route>
            </Routes>
          </Suspense>
        </LoadingProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

export function renderWithRouterAndLoadingProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <LoadingProvider>{ui}</LoadingProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

export function renderWithRouterAndThemeProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>
  );
}

export function renderWithLoadingProvider(ui: React.ReactElement) {
  return render(<LoadingProvider>{ui}</LoadingProvider>);
}

export function renderWithToastProvider(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <LoadingProvider>
        {ui}
        <Toast />
      </LoadingProvider>
    </ThemeProvider>
  );
}
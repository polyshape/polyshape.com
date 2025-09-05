import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'overlayscrollbars/styles/overlayscrollbars.css';
import "./styles/index.css";
import App from "./App";
import { LoadingProvider } from "./lib/common/ui/spinner/LoadingProvider";
import { LoadingOverlay } from "./lib/common/ui/LoadingOverlay";

async function enableMocking() {
  // Only run when in dev AND flag enabled
  if (!(import.meta.env.DEV && import.meta.env.VITE_USE_MSW === "true")) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" }, // from /public
    onUnhandledRequest: "bypass", // or "warn" while debugging
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LoadingProvider>
        <App/>
        <LoadingOverlay/>
      </LoadingProvider>
    </StrictMode>
  );
});

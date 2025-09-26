import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'overlayscrollbars/styles/overlayscrollbars.css';
import "./styles/index.css";
import App from "./App";
import { LoadingOverlay, LoadingProvider } from "@polyutils/components";

async function enableMocking() {
  // Only run when in dev AND flag enabled AND accessed from localhost
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!(import.meta.env.DEV && import.meta.env.VITE_USE_MSW === "true" && isLocalhost)) {
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

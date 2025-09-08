import { PropagateLoader } from "react-spinners";
import { useLoading } from "./spinner/useLoading";

export function LoadingOverlay() {
  const { state } = useLoading();

  if (state !== "loading") {
    return <></>;
  }

  return (
    <div className="loading__overlay">
      <PropagateLoader color="var(--primary-link)"/>
    </div>
  );
}

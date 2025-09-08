import { ToastContainer } from "react-toastify";
import { useTheme } from "./theme/useTheme";

export default function ToastHost() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      theme={theme === "dark" ? "dark" : "light"}
      closeOnClick
      closeButton={false}
      autoClose={8000}
    />
  );
}


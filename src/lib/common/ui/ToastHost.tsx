import { useTheme } from "@polyutils/components";
import { ToastContainer } from "react-toastify";

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


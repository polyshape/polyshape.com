/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "@testing-library/jest-dom/vitest",
      "./vitest.polyfill.ts",
      "./vitest.setup.ts"
    ],
    include: ["**/?(*.)+(test).[jt]s?(x)"],
    reporters: ["default", "html"],
    outputFile: {
      html: "./vitest-report/index.html"
    }
  }
})
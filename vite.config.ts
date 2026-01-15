import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_GifExpertApp/',
  test: {
    environment: "jsdom",
    globals: true,
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '',
  plugins: [
    tailwindcss(),
    react(),
    viteTsconfigPaths()
  ],
  server: {
    port: 3000,
    watch: {
      // ignored: ["**/node_modules/**", "**/vendor/**"],
      ignored: ["**/node_modules/**", "**/venv-pywebview/**", "**/gui/**"],
    },
  },
})

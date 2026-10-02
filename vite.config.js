import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' makes the build work under any GitHub Pages sub-path (/repo-name/)
export default defineConfig({ base: './', plugins: [react()] })

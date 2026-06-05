import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/glam-nail-bar/',
  plugins: [react()],
});

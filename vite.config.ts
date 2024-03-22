import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['http://new.xianbao.fun/douban-maizu/*','http://new.xianbao.fun/category-douban-maizu/*','https://www.douban.com/group/*'],
        'run-at': 'document-end'
      },
    }),
  ],
});

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, defineWorkspace, mergeConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import viteConfig from './vite.config.ts';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
  // 일반적인 컴포넌트 테스트를 위한 워크스페이스 (jsdom 환경 명시)
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        name: 'component-tests',
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
      },
    })
  ),
  // Storybook 테스트를 위한 워크스페이스 (browser 환경)
  {
    extends: 'vite.config.ts',
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);

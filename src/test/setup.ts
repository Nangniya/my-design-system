import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// test 간 DOM 상태를 초기화
afterEach(() => {
  cleanup();
});

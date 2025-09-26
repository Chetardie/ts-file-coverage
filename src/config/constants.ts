export const DEFAULT_SUPPORTED_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.vue',
] as const;

export const DEFAULT_IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.git/**',
  '**/coverage/**',
  '**/*.test.*',
  '**/*.spec.*',
] as const;

export const DEFAULT_TARGET_DIRECTORY = 'src';

export const TYPESCRIPT_EXTENSIONS = ['.ts', '.tsx'] as const;
export const JAVASCRIPT_EXTENSIONS = ['.js', '.jsx'] as const;
export const VUE_EXTENSION = '.vue';

export const VUE_TYPESCRIPT_PATTERN =
  /<script[^>]*lang\s*=\s*["']ts["'][^>]*>/i;

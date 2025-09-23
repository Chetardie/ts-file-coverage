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
] as const;

export const DEFAULT_TARGET_DIRECTORY = 'src';

export const TYPESCRIPT_EXTENSIONS = ['.ts', '.tsx'] as const;
export const JAVASCRIPT_EXTENSIONS = ['.js', '.jsx'] as const;
export const VUE_EXTENSION = '.vue';

export const VUE_TYPESCRIPT_PATTERN =
  /<script[^>]*lang\s*=\s*["']ts["'][^>]*>/i;

export const TYPESCRIPT_SYNTAX_PATTERNS = [
  /interface\s+\w+/,
  /type\s+\w+\s*=/,
  /enum\s+\w+/,
  /\b(public|private|protected)\s+\w+/,
  /\(\s*\w+\s*:\s*\w+\s*\)/,
  /:\s*\w+\[\]\s*[=;]/,
] as const;

export const JSX_TYPESCRIPT_PATTERNS = [
  /import.*from.*['"].*\.tsx?['"]/,
  /interface\s+\w+/,
  /type\s+\w+\s*=/,
  /:\s*React\.FC</,
  /:\s*\w+\[\]/,
] as const;

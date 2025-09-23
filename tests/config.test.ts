import { describe, it, expect } from 'vitest';
import { createConfig } from '../src/config';

describe('Configuration', () => {
  describe('createConfig', () => {
    it('should use default values when no options provided', () => {
      const config = createConfig();

      expect(config.targetDirectory).toBe('src');
      expect(config.supportedExtensions).toEqual([
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.vue',
      ]);
      expect(config.ignorePatterns).toEqual([
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/coverage/**',
      ]);
    });

    it('should override target directory', () => {
      const config = createConfig({ dir: 'custom-dir' });

      expect(config.targetDirectory).toBe('custom-dir');
      expect(config.supportedExtensions).toEqual([
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.vue',
      ]);
    });

    it('should override supported extensions', () => {
      const config = createConfig({ extensions: ['.ts', '.tsx'] });

      expect(config.targetDirectory).toBe('src');
      expect(config.supportedExtensions).toEqual(['.ts', '.tsx']);
    });

    it('should override ignore patterns', () => {
      const config = createConfig({ ignore: ['**/test/**'] });

      expect(config.ignorePatterns).toEqual(['**/test/**']);
    });

    it('should handle empty extensions array', () => {
      const config = createConfig({ extensions: [] });

      expect(config.supportedExtensions).toEqual([]);
    });

    it('should handle empty ignore patterns array', () => {
      const config = createConfig({ ignore: [] });

      expect(config.ignorePatterns).toEqual([]);
    });

    it('should override multiple options at once', () => {
      const config = createConfig({
        dir: 'my-project',
        extensions: ['.ts'],
        ignore: ['**/node_modules/**'],
      });

      expect(config.targetDirectory).toBe('my-project');
      expect(config.supportedExtensions).toEqual(['.ts']);
      expect(config.ignorePatterns).toEqual(['**/node_modules/**']);
    });
  });
});

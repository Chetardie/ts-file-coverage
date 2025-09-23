import { describe, it, expect } from 'vitest';
import { FileDiscoveryService } from '../../src/services';
import { createConfig } from '../../src/config';
import { getFixturePath } from '../helpers/fixture-utils';

describe('FileDiscoveryService', () => {
  describe('File Discovery', () => {
    it('should discover files in TypeScript directory', async () => {
      const config = createConfig({ dir: getFixturePath('typescript') });
      const discovery = new FileDiscoveryService(config);

      const files = await discovery.discoverFiles();

      expect(files).toHaveLength(3);
      expect(files.every(f => f.includes('typescript'))).toBe(true);
      expect(files.some(f => f.endsWith('.ts'))).toBe(true);
      expect(files.some(f => f.endsWith('.tsx'))).toBe(true);
    });

    it('should respect custom extensions', async () => {
      const config = createConfig({
        dir: getFixturePath(),
        extensions: ['.ts'],
      });
      const discovery = new FileDiscoveryService(config);

      const files = await discovery.discoverFiles();

      expect(files.every(f => f.endsWith('.ts'))).toBe(true);
      expect(files.some(f => f.endsWith('.tsx'))).toBe(false);
      expect(files.some(f => f.endsWith('.js'))).toBe(false);
    });

    it('should respect ignore patterns', async () => {
      const config = createConfig({
        dir: getFixturePath(),
        ignore: ['**/typescript/**'],
      });
      const discovery = new FileDiscoveryService(config);

      const files = await discovery.discoverFiles();

      expect(files.every(f => !f.includes('/typescript/'))).toBe(true);
    });

    it('should return empty array for non-existent directory', async () => {
      const config = createConfig({ dir: 'non-existent-directory' });
      const discovery = new FileDiscoveryService(config);

      const files = await discovery.discoverFiles();

      expect(files).toHaveLength(0);
    });

    it('should sort files alphabetically', async () => {
      const config = createConfig({ dir: getFixturePath('typescript') });
      const discovery = new FileDiscoveryService(config);

      const files = await discovery.discoverFiles();

      const sorted = [...files].sort();
      expect(files).toEqual(sorted);
    });
  });
});

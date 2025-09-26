import { describe, it, expect } from 'vitest';
import { FileAnalyzerService } from '../../src/services';
import { getFixturePath } from '../helpers/fixture-utils';

describe('FileAnalyzerService', () => {
  const fileAnalyzer = new FileAnalyzerService();

  describe('Individual File Analysis', () => {
    it('should analyze TypeScript files correctly', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('typescript', 'user.ts')
      );

      expect(result.isTypeScriptFile).toBe(true);
      expect(result.extension).toBe('.ts');
      expect(result.typeScriptLines).toBe(result.totalLines);
      expect(result.javaScriptLines).toBe(0);
      expect(result.totalLines).toBeGreaterThan(0);
    });

    it('should analyze JavaScript files correctly', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('javascript', 'legacy.js')
      );

      expect(result.isTypeScriptFile).toBe(false);
      expect(result.extension).toBe('.js');
      expect(result.javaScriptLines).toBe(result.totalLines);
      expect(result.typeScriptLines).toBe(0);
    });

    it('should treat JS files as JavaScript regardless of content', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('mixed-content', 'partial-ts.js')
      );

      expect(result.isTypeScriptFile).toBe(false);
      expect(result.extension).toBe('.js');
    });

    it('should handle Vue files with TypeScript', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('vue', 'TypeScriptComponent.vue')
      );

      expect(result.isTypeScriptFile).toBe(true);
      expect(result.extension).toBe('.vue');
    });

    it('should handle Vue files with JavaScript', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('vue', 'JavaScriptComponent.vue')
      );

      expect(result.isTypeScriptFile).toBe(false);
      expect(result.extension).toBe('.vue');
    });

    it('should handle empty files', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('empty', 'empty.ts')
      );

      expect(result.totalLines).toBe(0);
      expect(result.isTypeScriptFile).toBe(true);
    });

    it('should not count comments-only files', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('comments-only', 'comments.js')
      );

      expect(result.totalLines).toBe(0);
    });

    it('should analyze JSX files correctly', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('jsx', 'Component.jsx')
      );

      expect(result.extension).toBe('.jsx');
      expect(result.totalLines).toBeGreaterThan(0);
      // This should be JavaScript since it's plain JSX without TypeScript syntax
      expect(result.isTypeScriptFile).toBe(false);
    });

    it('should treat JSX files as JavaScript regardless of content', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('jsx', 'TypeScriptComponent.jsx')
      );

      expect(result.extension).toBe('.jsx');
      expect(result.isTypeScriptFile).toBe(false);
    });

    it('should handle file metadata correctly', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('typescript', 'user.ts')
      );

      expect(result.size).toBeGreaterThan(0);
      expect(result.path).toContain('user.ts');
      expect(typeof result.size).toBe('number');
    });
  });

  describe('Multiple Files', () => {
    it('should analyze multiple files correctly', async () => {
      const files = [
        getFixturePath('typescript', 'user.ts'),
        getFixturePath('javascript', 'legacy.js'),
        getFixturePath('vue', 'TypeScriptComponent.vue'),
      ];

      const results = await fileAnalyzer.analyzeFiles(files);

      expect(results).toHaveLength(3);
      expect(results[0].isTypeScriptFile).toBe(true);
      expect(results[1].isTypeScriptFile).toBe(false);
      expect(results[2].isTypeScriptFile).toBe(true);
    });

    it('should handle non-existent files gracefully', async () => {
      const files = [
        getFixturePath('typescript', 'user.ts'),
        'non-existent-file.ts',
      ];

      const results = await fileAnalyzer.analyzeFiles(files);

      expect(results).toHaveLength(1);
      expect(results[0].path).toContain('user.ts');
    });

    it('should handle mixed file types correctly', async () => {
      const files = [
        getFixturePath('typescript', 'user.ts'),
        getFixturePath('javascript', 'legacy.js'),
        getFixturePath('jsx', 'Component.jsx'),
        getFixturePath('vue', 'TypeScriptComponent.vue'),
        getFixturePath('empty', 'empty.ts'),
      ];

      const results = await fileAnalyzer.analyzeFiles(files);

      expect(results).toHaveLength(5);

      // Check that each file type is analyzed correctly
      const tsFile = results.find(r => r.path.includes('user.ts'));
      const jsFile = results.find(r => r.path.includes('legacy.js'));
      const jsxFile = results.find(r => r.path.includes('Component.jsx'));
      const vueFile = results.find(r =>
        r.path.includes('TypeScriptComponent.vue')
      );
      const emptyFile = results.find(r => r.path.includes('empty.ts'));

      expect(tsFile?.isTypeScriptFile).toBe(true);
      expect(jsFile?.isTypeScriptFile).toBe(false);
      expect(jsxFile?.isTypeScriptFile).toBe(false);
      expect(vueFile?.isTypeScriptFile).toBe(true);
      expect(emptyFile?.isTypeScriptFile).toBe(true);
      expect(emptyFile?.totalLines).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for non-existent file', async () => {
      await expect(
        fileAnalyzer.analyzeFile('non-existent-file.ts')
      ).rejects.toThrow();
    });

    it('should handle invalid file paths gracefully in batch analysis', async () => {
      const files = [
        getFixturePath('typescript', 'user.ts'),
        'invalid/path/file.ts',
        getFixturePath('javascript', 'legacy.js'),
      ];

      const results = await fileAnalyzer.analyzeFiles(files);

      // Should return only the valid files
      expect(results).toHaveLength(2);
      expect(results[0].path).toContain('user.ts');
      expect(results[1].path).toContain('legacy.js');
    });
  });
});

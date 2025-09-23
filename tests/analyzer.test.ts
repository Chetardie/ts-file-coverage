import { describe, it, expect } from 'vitest';
import { TSFileCoverageAnalyzer } from '../src/analyzer';
import { FileAnalyzerService, SummaryGenerator } from '../src/services';
import { getFixturePath } from './helpers/fixture-utils';

describe('TSFileCoverageAnalyzer', () => {
  describe('Full Analysis', () => {
    it('should analyze TypeScript-only directory correctly', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: getFixturePath('typescript'),
      });
      const result = await analyzer.analyze();

      expect(result.summary.totalFiles).toBe(3);
      expect(result.summary.typeScriptFiles).toBe(3);
      expect(result.summary.javaScriptFiles).toBe(0);
      expect(result.summary.totalLines).toBeGreaterThan(0);
      expect(result.summary.typeScriptLines).toBe(result.summary.totalLines);
      expect(result.summary.javaScriptLines).toBe(0);
    });

    it('should analyze JavaScript-only directory correctly', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: getFixturePath('javascript'),
      });
      const result = await analyzer.analyze();

      expect(result.summary.totalFiles).toBe(3);
      expect(result.summary.typeScriptFiles).toBe(0);
      expect(result.summary.javaScriptFiles).toBe(3);
      expect(result.summary.totalLines).toBeGreaterThan(0);
      expect(result.summary.typeScriptLines).toBe(0);
      expect(result.summary.javaScriptLines).toBe(result.summary.totalLines);
    });

    it('should analyze mixed directory correctly', async () => {
      const analyzer = new TSFileCoverageAnalyzer({ dir: getFixturePath() });
      const result = await analyzer.analyze();

      expect(result.summary.totalFiles).toBe(17);
      expect(result.summary.typeScriptFiles).toBe(8);
      expect(result.summary.javaScriptFiles).toBe(9);
      expect(result.summary.totalLines).toBe(676);
      expect(result.summary.typeScriptLines).toBe(262);
      expect(result.summary.javaScriptLines).toBe(414);
    });

    it('should throw error for non-existent directory', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: 'non-existent-directory',
      });

      await expect(analyzer.analyze()).rejects.toThrow(
        'No TypeScript/JavaScript files found'
      );
    });

    it('should include config in result', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: getFixturePath('typescript'),
      });
      const result = await analyzer.analyze();

      expect(result.config.targetDirectory).toContain('typescript');
      expect(result.config.supportedExtensions).toEqual([
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.vue',
      ]);
    });
  });

  describe('Configuration', () => {
    it('should use custom extensions if provided', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: getFixturePath('typescript'),
        extensions: ['.ts', '.tsx'],
      });
      const result = await analyzer.analyze();

      expect(result.config.supportedExtensions).toEqual(['.ts', '.tsx']);
    });

    it('should use custom ignore patterns if provided', async () => {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: getFixturePath(),
        ignore: ['**/javascript/**'],
      });

      // This should find fewer files since we're ignoring the javascript directory
      const result = await analyzer.analyze();
      expect(result.summary.totalFiles).toBeLessThan(17);
    });
  });
});

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

    it('should detect TypeScript syntax in JS files', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('mixed-content', 'partial-ts.js')
      );

      expect(result.isTypeScriptFile).toBe(true);
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

    it('should detect TypeScript in JSX files', async () => {
      const result = await fileAnalyzer.analyzeFile(
        getFixturePath('jsx', 'TypeScriptComponent.jsx')
      );

      expect(result.extension).toBe('.jsx');
      expect(result.isTypeScriptFile).toBe(true);
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
  });
});

describe('SummaryGenerator', () => {
  const summaryGenerator = new SummaryGenerator();
  const fileAnalyzer = new FileAnalyzerService();

  it('should generate correct summary', async () => {
    const files = await fileAnalyzer.analyzeFiles([
      getFixturePath('typescript', 'user.ts'),
      getFixturePath('javascript', 'legacy.js'),
      getFixturePath('vue', 'TypeScriptComponent.vue'),
    ]);

    const summary = summaryGenerator.generateSummary(files);

    expect(summary.totalFiles).toBe(3);
    expect(summary.typeScriptFiles).toBe(2);
    expect(summary.javaScriptFiles).toBe(1);
    expect(summary.totalLines).toBeGreaterThan(0);
    expect(summary.typeScriptLines).toBeGreaterThan(0);
    expect(summary.javaScriptLines).toBeGreaterThan(0);
  });

  it('should handle empty file list', () => {
    const summary = summaryGenerator.generateSummary([]);

    expect(summary.totalFiles).toBe(0);
    expect(summary.typeScriptFiles).toBe(0);
    expect(summary.javaScriptFiles).toBe(0);
    expect(summary.totalLines).toBe(0);
    expect(summary.typeScriptLines).toBe(0);
    expect(summary.javaScriptLines).toBe(0);
  });
});

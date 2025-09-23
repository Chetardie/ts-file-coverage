import { describe, it, expect } from 'vitest';
import { SummaryGenerator, FileAnalyzerService } from '../../src/services';
import { getFixturePath } from '../helpers/fixture-utils';

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

  it('should calculate percentages correctly', async () => {
    const files = await fileAnalyzer.analyzeFiles([
      getFixturePath('typescript', 'user.ts'),
      getFixturePath('typescript', 'utils.ts'),
      getFixturePath('javascript', 'legacy.js'),
    ]);

    const summary = summaryGenerator.generateSummary(files);

    expect(summary.totalFiles).toBe(3);
    expect(summary.typeScriptFiles).toBe(2);
    expect(summary.javaScriptFiles).toBe(1);

    // Verify the math is correct
    expect(summary.typeScriptFiles + summary.javaScriptFiles).toBe(
      summary.totalFiles
    );
    expect(summary.typeScriptLines + summary.javaScriptLines).toBe(
      summary.totalLines
    );
  });
});

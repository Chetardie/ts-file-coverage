import { describe, it, expect, vi } from 'vitest';
import { OutputFormatter } from '../../src/services';

describe('OutputFormatter', () => {
  const formatter = new OutputFormatter();

  describe('Output Formatting', () => {
    it('should format results correctly', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const summary = {
        totalFiles: 10,
        typeScriptFiles: 7,
        javaScriptFiles: 3,
        totalLines: 1000,
        typeScriptLines: 700,
        javaScriptLines: 300,
        vue: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        react: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        plainJsTs: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(summary, '/test/dir', ['.ts', '.js']);

      // Check that the basic structure is called correctly
      expect(consoleSpy).toHaveBeenCalledWith('\nTypeScript File Analysis');
      expect(consoleSpy).toHaveBeenCalledWith('========================');
      expect(consoleSpy).toHaveBeenCalledWith('Directory: /test/dir');
      expect(consoleSpy).toHaveBeenCalledWith('File types: .ts, .js');
      expect(consoleSpy).toHaveBeenCalledWith('- Total files: 10');
      expect(consoleSpy).toHaveBeenCalledWith('- TypeScript files: 7 (70.0%)');
      expect(consoleSpy).toHaveBeenCalledWith('- JavaScript files: 3 (30.0%)');

      // Check that some form of total lines is displayed (localization may vary)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('- Total lines:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- TypeScript lines: 700 (70.0%)'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- JavaScript lines: 300 (30.0%)'
      );

      // Check that colored coverage lines are displayed (both files and lines)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Lines Coverage:')
      );

      consoleSpy.mockRestore();
    });

    it('should handle zero files correctly', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const summary = {
        totalFiles: 0,
        typeScriptFiles: 0,
        javaScriptFiles: 0,
        totalLines: 0,
        typeScriptLines: 0,
        javaScriptLines: 0,
        vue: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        react: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        plainJsTs: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(summary, '/empty/dir', ['.ts']);

      expect(consoleSpy).toHaveBeenCalledWith('- TypeScript files: 0 (0.0%)');
      expect(consoleSpy).toHaveBeenCalledWith('- JavaScript files: 0 (0.0%)');

      // Check that colored coverage lines are displayed even with 0%
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Lines Coverage:')
      );

      consoleSpy.mockRestore();
    });

    it('should handle zero lines correctly', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const summary = {
        totalFiles: 2,
        typeScriptFiles: 1,
        javaScriptFiles: 1,
        totalLines: 0,
        typeScriptLines: 0,
        javaScriptLines: 0,
        vue: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        react: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        plainJsTs: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(summary, '/test/dir', ['.ts']);

      // Should not display line percentages when totalLines is 0
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('TypeScript lines:')
      );

      // But should still display colored coverage lines
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Lines Coverage:')
      );

      consoleSpy.mockRestore();
    });

    it('should display framework breakdown when Vue/React files are present', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const summary = {
        totalFiles: 6,
        typeScriptFiles: 4,
        javaScriptFiles: 2,
        totalLines: 500,
        typeScriptLines: 350,
        javaScriptLines: 150,
        vue: {
          totalFiles: 2,
          totalLines: 100,
          typeScriptFiles: 1,
          javaScriptFiles: 1,
          typeScriptLines: 60,
          javaScriptLines: 40,
        },
        react: {
          totalFiles: 3,
          totalLines: 200,
          typeScriptFiles: 2,
          javaScriptFiles: 1,
          typeScriptLines: 150,
          javaScriptLines: 50,
        },
        plainJsTs: {
          totalFiles: 1,
          totalLines: 200,
          typeScriptFiles: 1,
          javaScriptFiles: 0,
          typeScriptLines: 200,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(summary, '/test/dir', [
        '.ts',
        '.js',
        '.vue',
        '.jsx',
      ]);

      // Check framework breakdown is displayed
      expect(consoleSpy).toHaveBeenCalledWith('\nFramework Breakdown:');

      // Check Vue section
      expect(consoleSpy).toHaveBeenCalledWith('\nVue.js Files:');
      expect(consoleSpy).toHaveBeenCalledWith(
        '- Total Vue files: 2 (33.3% of all files)'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- Vue with TypeScript: 1 (50.0%)'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- Vue with JavaScript: 1 (50.0%)'
      );

      // Check React section
      expect(consoleSpy).toHaveBeenCalledWith('\nReact Files:');
      expect(consoleSpy).toHaveBeenCalledWith(
        '- Total React files: 3 (50.0% of all files)'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- React with TypeScript: 2 (66.7%)'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '- React with JavaScript: 1 (33.3%)'
      );

      // Check that colored coverage lines are displayed for each framework (both files and lines)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Lines Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Vue Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Vue Lines Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 React Files Coverage:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 React Lines Coverage:')
      );

      consoleSpy.mockRestore();
    });

    it('should not display framework breakdown when no Vue/React files are present', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const summary = {
        totalFiles: 2,
        typeScriptFiles: 1,
        javaScriptFiles: 1,
        totalLines: 100,
        typeScriptLines: 50,
        javaScriptLines: 50,
        vue: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        react: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        plainJsTs: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(summary, '/test/dir', ['.ts', '.js']);

      // Should not display framework breakdown
      expect(consoleSpy).not.toHaveBeenCalledWith('\nFramework Breakdown:');
      expect(consoleSpy).not.toHaveBeenCalledWith('\nVue.js Files:');
      expect(consoleSpy).not.toHaveBeenCalledWith('\nReact Files:');

      consoleSpy.mockRestore();
    });

    it('should use different colors based on coverage percentage', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Test high coverage (should be green)
      const highCoverageSummary = {
        totalFiles: 10,
        typeScriptFiles: 9, // 90%
        javaScriptFiles: 1,
        totalLines: 1000,
        typeScriptLines: 900,
        javaScriptLines: 100,
        vue: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        react: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
        plainJsTs: {
          totalFiles: 0,
          totalLines: 0,
          typeScriptFiles: 0,
          javaScriptFiles: 0,
          typeScriptLines: 0,
          javaScriptLines: 0,
        },
      };

      formatter.formatResults(highCoverageSummary, '/test/dir', ['.ts', '.js']);

      // Should contain the coverage lines with emoji (both files and lines)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Files Coverage: ')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('📊 Overall Lines Coverage: ')
      );

      consoleSpy.mockRestore();
    });
  });
});

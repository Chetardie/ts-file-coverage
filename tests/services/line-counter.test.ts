import { describe, it, expect } from 'vitest';
import { LineCounter } from '../../src/services';

describe('LineCounter', () => {
  const counter = new LineCounter();

  describe('Basic Line Counting', () => {
    it('should count non-empty lines', () => {
      const content = 'line1\nline2\nline3';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(3);
    });

    it('should ignore empty lines', () => {
      const content = 'line1\n\n\nline2\n\n';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should ignore whitespace-only lines', () => {
      const content = 'line1\n   \n\t\t\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should handle empty content', () => {
      expect(counter.countNonEmptyNonCommentLines('')).toBe(0);
      expect(counter.countNonEmptyNonCommentLines('   ')).toBe(0);
    });
  });

  describe('Comment Handling', () => {
    it('should ignore single-line comments', () => {
      const content = 'line1\n// comment\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should ignore block comments', () => {
      const content = 'line1\n/* comment */\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should handle multi-line block comments', () => {
      const content = 'line1\n/*\n comment\n line\n*/\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should handle code after block comment on same line', () => {
      const content = 'line1\n/* comment */ code\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should not count code after single-line comment', () => {
      const content = 'line1\n// comment with code\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });

    it('should handle nested block comments correctly', () => {
      const content = 'line1\n/* outer /* inner */ still comment */\nline2';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle comments-only content', () => {
      const content = '// comment1\n/* comment2 */\n// comment3';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(0);
    });

    it('should handle mixed content with various line endings', () => {
      const content = 'line1\r\n// comment\r\nline2\n/* block */\r\nline3';
      expect(counter.countNonEmptyNonCommentLines(content)).toBe(3);
    });
  });
});

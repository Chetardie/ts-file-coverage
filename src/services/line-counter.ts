export class LineCounter {
  countNonEmptyNonCommentLines(content: string): number {
    if (!content.trim()) {
      return 0;
    }

    const lines = content.split(/\r?\n/);
    return this.countNonCommentLines(lines);
  }

  private countNonCommentLines(lines: string[]): number {
    let count = 0;
    let inBlockComment = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) continue;

      if (inBlockComment) {
        if (trimmed.includes('*/')) {
          inBlockComment = false;
          const afterComment = trimmed
            .substring(trimmed.indexOf('*/') + 2)
            .trim();
          if (afterComment && !afterComment.startsWith('//')) {
            count++;
          }
        }
        continue;
      }

      if (trimmed.startsWith('/*')) {
        if (!trimmed.includes('*/')) {
          inBlockComment = true;
        }
        continue;
      }

      if (trimmed.startsWith('//')) {
        continue;
      }

      count++;
    }

    return count;
  }
}

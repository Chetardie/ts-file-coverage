import { FileInfo, AnalysisSummary, FrameworkStats } from '../types';

export class SummaryGenerator {
  generateSummary(files: FileInfo[]): AnalysisSummary {
    const typeScriptFiles = files.filter(f => f.isTypeScriptFile).length;

    return {
      totalFiles: files.length,
      totalLines: files.reduce((sum, file) => sum + file.totalLines, 0),
      typeScriptFiles,
      javaScriptFiles: files.length - typeScriptFiles,
      typeScriptLines: files.reduce(
        (sum, file) => sum + file.typeScriptLines,
        0
      ),
      javaScriptLines: files.reduce(
        (sum, file) => sum + file.javaScriptLines,
        0
      ),
      vue: this.generateFrameworkStats(files, 'vue'),
      react: this.generateFrameworkStats(files, 'react'),
      plainJsTs: this.generatePlainJsTsStats(files),
    };
  }

  private generatePlainJsTsStats(files: FileInfo[]): FrameworkStats {
    // Filter files that are plain .js or .ts (no framework)
    const plainFiles = files.filter(f => f.framework === null);
    const typeScriptFiles = plainFiles.filter(f => f.isTypeScriptFile).length;

    return {
      totalFiles: plainFiles.length,
      totalLines: plainFiles.reduce((sum, file) => sum + file.totalLines, 0),
      typeScriptFiles,
      javaScriptFiles: plainFiles.length - typeScriptFiles,
      typeScriptLines: plainFiles.reduce(
        (sum, file) => sum + file.typeScriptLines,
        0
      ),
      javaScriptLines: plainFiles.reduce(
        (sum, file) => sum + file.javaScriptLines,
        0
      ),
    };
  }

  private generateFrameworkStats(
    files: FileInfo[],
    framework: 'vue' | 'react'
  ): FrameworkStats {
    const frameworkFiles = files.filter(f => f.framework === framework);
    const typeScriptFiles = frameworkFiles.filter(
      f => f.isTypeScriptFile
    ).length;

    return {
      totalFiles: frameworkFiles.length,
      totalLines: frameworkFiles.reduce(
        (sum, file) => sum + file.totalLines,
        0
      ),
      typeScriptFiles,
      javaScriptFiles: frameworkFiles.length - typeScriptFiles,
      typeScriptLines: frameworkFiles.reduce(
        (sum, file) => sum + file.typeScriptLines,
        0
      ),
      javaScriptLines: frameworkFiles.reduce(
        (sum, file) => sum + file.javaScriptLines,
        0
      ),
    };
  }
}

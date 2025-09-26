import { promises as fs } from 'fs';
import { extname } from 'path';
import { FileInfo } from '../types';
import { TypeScriptDetector } from './typescript-detector';
import { LineCounter } from './line-counter';

export class FileAnalyzerService {
  private typeScriptDetector = new TypeScriptDetector();
  private lineCounter = new LineCounter();

  async analyzeFile(filePath: string): Promise<FileInfo> {
    try {
      const [content, stats] = await Promise.all([
        fs.readFile(filePath, 'utf-8'),
        fs.stat(filePath),
      ]);

      const extension = extname(filePath).toLowerCase();
      const totalLines = this.lineCounter.countNonEmptyNonCommentLines(content);
      const isTypeScriptFile = this.typeScriptDetector.isTypeScriptFile(
        filePath,
        content
      );
      const framework = this.detectFramework(filePath, extension);

      const typeScriptLines = isTypeScriptFile ? totalLines : 0;
      const javaScriptLines = isTypeScriptFile ? 0 : totalLines;

      return {
        path: filePath,
        extension,
        totalLines,
        typeScriptLines,
        javaScriptLines,
        isTypeScriptFile,
        size: stats.size,
        framework,
      };
    } catch (error) {
      throw new Error(`Failed to analyze file ${filePath}: ${error}`);
    }
  }

  private detectFramework(
    filePath: string,
    extension: string
  ): 'vue' | 'react' | null {
    if (extension === '.vue') {
      return 'vue';
    }

    if (extension === '.jsx' || extension === '.tsx') {
      return 'react';
    }

    return null;
  }

  async analyzeFiles(filePaths: string[]): Promise<FileInfo[]> {
    const results: FileInfo[] = [];

    for (const filePath of filePaths) {
      try {
        const fileInfo = await this.analyzeFile(filePath);
        results.push(fileInfo);
      } catch (error) {
        console.warn(`Warning: Could not analyze ${filePath}: ${error}`);
      }
    }

    return results;
  }
}

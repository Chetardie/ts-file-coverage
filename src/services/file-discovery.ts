import fg from 'fast-glob';
import { AnalysisConfig } from '../config';

export class FileDiscoveryService {
  constructor(private config: AnalysisConfig) {}

  async discoverFiles(): Promise<string[]> {
    const patterns = this.createSearchPatterns();

    try {
      const files = await fg(patterns, {
        ignore: [...this.config.ignorePatterns],
        absolute: true,
        onlyFiles: true,
        dot: false,
      });

      return files.sort();
    } catch (error) {
      throw new Error(`Failed to discover files: ${error}`);
    }
  }

  private createSearchPatterns(): string[] {
    const normalizedBase = this.config.targetDirectory.replace(/\\/g, '/');
    return this.config.supportedExtensions.map(
      ext => `${normalizedBase}/**/*${ext}`
    );
  }
}

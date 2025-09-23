import { resolve } from 'path';
import { AnalysisConfig, AnalysisOptions, createConfig } from './config';
import { AnalysisResult } from './types';
import {
  FileDiscoveryService,
  FileAnalyzerService,
  SummaryGenerator,
  OutputFormatter,
} from './services';

export class TSFileCoverageAnalyzer {
  private config: AnalysisConfig;
  private fileDiscovery: FileDiscoveryService;
  private fileAnalyzer: FileAnalyzerService;
  private summaryGenerator: SummaryGenerator;
  private outputFormatter: OutputFormatter;

  constructor(options: AnalysisOptions = {}) {
    this.config = createConfig({
      ...options,
      dir: options.dir ? resolve(options.dir) : undefined,
    });

    this.fileDiscovery = new FileDiscoveryService(this.config);
    this.fileAnalyzer = new FileAnalyzerService();
    this.summaryGenerator = new SummaryGenerator();
    this.outputFormatter = new OutputFormatter();
  }

  async analyze(): Promise<AnalysisResult> {
    const files = await this.fileDiscovery.discoverFiles();

    if (files.length === 0) {
      throw new Error(
        'No TypeScript/JavaScript files found in the specified directory.'
      );
    }

    const analyzedFiles = await this.fileAnalyzer.analyzeFiles(files);
    const summary = this.summaryGenerator.generateSummary(analyzedFiles);

    return {
      summary,
      files: analyzedFiles,
      config: {
        targetDirectory: this.config.targetDirectory,
        supportedExtensions: this.config.supportedExtensions,
      },
    };
  }

  async analyzeAndOutput(): Promise<void> {
    console.log(`Analyzing directory: ${this.config.targetDirectory}`);

    const result = await this.analyze();

    console.log(`Found ${result.files.length} files to analyze...`);

    this.outputFormatter.formatResults(
      result.summary,
      result.config.targetDirectory,
      result.config.supportedExtensions
    );
  }
}

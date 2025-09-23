#!/usr/bin/env node

import { Command } from 'commander';
import { TSFileCoverageAnalyzer } from './analyzer';

const program = new Command();

program
  .name('ts-file-coverage')
  .description(
    'Analyze TypeScript adoption in your codebase with framework-specific breakdowns and color-coded coverage reports'
  )
  .version('1.0.0')
  .option('-d, --dir <directory>', 'Target directory to analyze', 'src')
  .action(async options => {
    try {
      const analyzer = new TSFileCoverageAnalyzer({
        dir: options.dir,
      });

      await analyzer.analyzeAndOutput();
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();

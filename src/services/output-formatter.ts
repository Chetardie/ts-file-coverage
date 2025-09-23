import { AnalysisSummary, FrameworkStats } from '../types';
import chalk from 'chalk';

export class OutputFormatter {
  formatResults(
    summary: AnalysisSummary,
    targetDirectory: string,
    supportedExtensions: readonly string[]
  ): void {
    this.printHeader(targetDirectory, supportedExtensions);
    this.printSummary(summary);
    this.printFrameworkStats(summary);
    this.printFooter();
  }

  private printHeader(
    targetDirectory: string,
    supportedExtensions: readonly string[]
  ): void {
    console.log('\nTypeScript File Analysis');
    console.log('========================');
    console.log(`Directory: ${targetDirectory}`);
    console.log(`File types: ${supportedExtensions.join(', ')}`);
    console.log('');
  }

  private printSummary(summary: AnalysisSummary): void {
    console.log('Results:');
    console.log(`- Total files: ${summary.totalFiles}`);

    const tsPercentage = this.calculatePercentage(
      summary.typeScriptFiles,
      summary.totalFiles
    );
    const jsPercentage = this.calculatePercentage(
      summary.javaScriptFiles,
      summary.totalFiles
    );

    console.log(
      `- TypeScript files: ${summary.typeScriptFiles} (${tsPercentage}%)`
    );
    console.log(
      `- JavaScript files: ${summary.javaScriptFiles} (${jsPercentage}%)`
    );
    console.log(`- Total lines: ${summary.totalLines.toLocaleString()}`);

    if (summary.totalLines > 0) {
      const tsLinePercentage = this.calculatePercentage(
        summary.typeScriptLines,
        summary.totalLines
      );
      const jsLinePercentage = this.calculatePercentage(
        summary.javaScriptLines,
        summary.totalLines
      );

      console.log(
        `- TypeScript lines: ${summary.typeScriptLines.toLocaleString()} (${tsLinePercentage}%)`
      );
      console.log(
        `- JavaScript lines: ${summary.javaScriptLines.toLocaleString()} (${jsLinePercentage}%)`
      );
    }

    // Add colored overall TypeScript coverage lines
    const overallFilesCoveragePercentage = this.calculatePercentage(
      summary.typeScriptFiles,
      summary.totalFiles
    );
    const overallLinesCoveragePercentage = this.calculatePercentage(
      summary.typeScriptLines,
      summary.totalLines
    );
    console.log(
      this.getColoredCoverageLine(
        'Overall Files Coverage',
        overallFilesCoveragePercentage
      )
    );
    console.log(
      this.getColoredCoverageLine(
        'Overall Lines Coverage',
        overallLinesCoveragePercentage
      )
    );
  }

  private printFrameworkStats(summary: AnalysisSummary): void {
    // Print plain JS/TS files section if there are any
    if (summary.plainJsTs.totalFiles > 0) {
      console.log('\nPlain JavaScript/TypeScript Files:');
      this.printFrameworkDetails(
        'Plain JS/TS',
        summary.plainJsTs,
        summary.totalFiles,
        summary.totalLines
      );
    }

    if (summary.vue.totalFiles > 0 || summary.react.totalFiles > 0) {
      console.log('\nFramework Breakdown:');

      if (summary.vue.totalFiles > 0) {
        console.log('\nVue.js Files:');
        this.printFrameworkDetails(
          'Vue',
          summary.vue,
          summary.totalFiles,
          summary.totalLines
        );
      }

      if (summary.react.totalFiles > 0) {
        console.log('\nReact Files:');
        this.printFrameworkDetails(
          'React',
          summary.react,
          summary.totalFiles,
          summary.totalLines
        );
      }
    }
  }

  private printFrameworkDetails(
    frameworkName: string,
    stats: FrameworkStats,
    totalFiles: number,
    totalLines: number
  ): void {
    const tsFilePercentage = this.calculatePercentage(
      stats.typeScriptFiles,
      stats.totalFiles
    );
    const jsFilePercentage = this.calculatePercentage(
      stats.javaScriptFiles,
      stats.totalFiles
    );

    const filesFromTotalPercentage = this.calculatePercentage(
      stats.totalFiles,
      totalFiles
    );
    const linesFromTotalPercentage = this.calculatePercentage(
      stats.totalLines,
      totalLines
    );

    console.log(
      `- Total ${frameworkName} files: ${stats.totalFiles} (${filesFromTotalPercentage}% of all files)`
    );
    console.log(
      `- ${frameworkName} with TypeScript: ${stats.typeScriptFiles} (${tsFilePercentage}%)`
    );
    console.log(
      `- ${frameworkName} with JavaScript: ${stats.javaScriptFiles} (${jsFilePercentage}%)`
    );
    console.log(
      `- Total ${frameworkName} lines: ${stats.totalLines.toLocaleString()} (${linesFromTotalPercentage}% of all lines)`
    );

    if (stats.totalLines > 0) {
      const tsLinePercentage = this.calculatePercentage(
        stats.typeScriptLines,
        stats.totalLines
      );
      const jsLinePercentage = this.calculatePercentage(
        stats.javaScriptLines,
        stats.totalLines
      );

      console.log(
        `- ${frameworkName} TypeScript lines: ${stats.typeScriptLines.toLocaleString()} (${tsLinePercentage}%)`
      );
      console.log(
        `- ${frameworkName} JavaScript lines: ${stats.javaScriptLines.toLocaleString()} (${jsLinePercentage}%)`
      );
    }

    // Add colored framework-specific coverage lines
    const frameworkFilesCoveragePercentage = this.calculatePercentage(
      stats.typeScriptFiles,
      stats.totalFiles
    );
    const frameworkLinesCoveragePercentage = this.calculatePercentage(
      stats.typeScriptLines,
      stats.totalLines
    );
    console.log(
      this.getColoredCoverageLine(
        `${frameworkName} Files Coverage`,
        frameworkFilesCoveragePercentage
      )
    );
    console.log(
      this.getColoredCoverageLine(
        `${frameworkName} Lines Coverage`,
        frameworkLinesCoveragePercentage
      )
    );
  }

  private printFooter(): void {
    console.log('');
  }

  private calculatePercentage(value: number, total: number): string {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  }

  private getColoredCoverageLine(label: string, percentage: string): string {
    const percentageNum = parseFloat(percentage);
    let coloredPercentage: string;

    // Color coding based on coverage percentage
    if (percentageNum >= 80) {
      coloredPercentage = chalk.green.bold(`${percentage}%`);
    } else if (percentageNum >= 60) {
      coloredPercentage = chalk.yellow.bold(`${percentage}%`);
    } else if (percentageNum >= 40) {
      coloredPercentage = chalk.magenta.bold(`${percentage}%`);
    } else {
      coloredPercentage = chalk.red.bold(`${percentage}%`);
    }

    return chalk.cyan(`📊 ${label}: `) + coloredPercentage;
  }
}

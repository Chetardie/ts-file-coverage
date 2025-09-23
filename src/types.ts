export interface FileInfo {
  path: string;
  extension: string;
  totalLines: number;
  typeScriptLines: number;
  javaScriptLines: number;
  isTypeScriptFile: boolean;
  size: number;
  framework?: 'vue' | 'react' | null;
}

export interface FrameworkStats {
  totalFiles: number;
  totalLines: number;
  typeScriptFiles: number;
  javaScriptFiles: number;
  typeScriptLines: number;
  javaScriptLines: number;
}

export interface AnalysisSummary {
  totalFiles: number;
  totalLines: number;
  typeScriptFiles: number;
  javaScriptFiles: number;
  typeScriptLines: number;
  javaScriptLines: number;
  vue: FrameworkStats;
  react: FrameworkStats;
  plainJsTs: FrameworkStats;
}

export interface AnalysisResult {
  summary: AnalysisSummary;
  files: FileInfo[];
  config: {
    targetDirectory: string;
    supportedExtensions: readonly string[];
  };
}

export type SupportedExtension = '.ts' | '.tsx' | '.js' | '.jsx' | '.vue';

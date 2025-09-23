import {
  DEFAULT_SUPPORTED_EXTENSIONS,
  DEFAULT_IGNORE_PATTERNS,
  DEFAULT_TARGET_DIRECTORY,
} from './constants';

export interface AnalysisConfig {
  targetDirectory: string;
  supportedExtensions: readonly string[];
  ignorePatterns: readonly string[];
}

export interface AnalysisOptions {
  dir?: string;
  extensions?: string[];
  ignore?: string[];
}

export function createConfig(options: AnalysisOptions = {}): AnalysisConfig {
  return {
    targetDirectory: options.dir ?? DEFAULT_TARGET_DIRECTORY,
    supportedExtensions: options.extensions ?? DEFAULT_SUPPORTED_EXTENSIONS,
    ignorePatterns: options.ignore ?? DEFAULT_IGNORE_PATTERNS,
  };
}

export * from './constants';

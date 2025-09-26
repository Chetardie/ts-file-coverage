import { extname } from 'path';
import {
  TYPESCRIPT_EXTENSIONS,
  VUE_EXTENSION,
  VUE_TYPESCRIPT_PATTERN,
} from '../config';
import { SupportedExtension } from '../types';

export class TypeScriptDetector {
  isTypeScriptFile(filePath: string, content: string): boolean {
    const extension = extname(filePath).toLowerCase() as SupportedExtension;

    if (this.isTypeScriptExtension(extension)) {
      return true;
    }

    if (this.isVueExtension(extension)) {
      return this.isVueWithTypeScript(content);
    }

    return false;
  }

  private isTypeScriptExtension(extension: string): boolean {
    return TYPESCRIPT_EXTENSIONS.includes(
      extension as (typeof TYPESCRIPT_EXTENSIONS)[number]
    );
  }

  private isVueExtension(extension: string): boolean {
    return extension === VUE_EXTENSION;
  }

  private isVueWithTypeScript(content: string): boolean {
    return VUE_TYPESCRIPT_PATTERN.test(content);
  }
}

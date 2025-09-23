import { extname } from 'path';
import {
  TYPESCRIPT_EXTENSIONS,
  VUE_EXTENSION,
  VUE_TYPESCRIPT_PATTERN,
  TYPESCRIPT_SYNTAX_PATTERNS,
  JSX_TYPESCRIPT_PATTERNS,
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

    if (this.isJsxExtension(extension)) {
      return this.hasTypeScriptSyntaxInJsx(content);
    }

    if (this.isJsExtension(extension)) {
      return this.hasDefinitiveTypeScriptSyntax(content);
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

  private isJsxExtension(extension: string): boolean {
    return extension === '.jsx';
  }

  private isJsExtension(extension: string): boolean {
    return extension === '.js';
  }

  private isVueWithTypeScript(content: string): boolean {
    return VUE_TYPESCRIPT_PATTERN.test(content);
  }

  private hasTypeScriptSyntaxInJsx(content: string): boolean {
    return JSX_TYPESCRIPT_PATTERNS.some(pattern => pattern.test(content));
  }

  private hasDefinitiveTypeScriptSyntax(content: string): boolean {
    return TYPESCRIPT_SYNTAX_PATTERNS.some(pattern => pattern.test(content));
  }
}

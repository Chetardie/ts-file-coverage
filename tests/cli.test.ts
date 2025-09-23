import { describe, it, expect } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getFixturePath } from './helpers/fixture-utils';

const execAsync = promisify(exec);

describe('CLI Integration', () => {
  it('should run CLI with default directory and show results', async () => {
    const { stdout } = await execAsync(
      `node bin/ts-file-coverage --dir ${getFixturePath()}`
    );

    expect(stdout).toContain('TypeScript File Analysis');
    expect(stdout).toContain('Total files:');
    expect(stdout).toContain('TypeScript files:');
    expect(stdout).toContain('JavaScript files:');
    expect(stdout).toContain('Total lines:');
  }, 10000);

  it('should run CLI with TypeScript-only directory', async () => {
    const { stdout } = await execAsync(
      `node bin/ts-file-coverage --dir ${getFixturePath('typescript')}`
    );

    expect(stdout).toContain('TypeScript files: 3 (100.0%)');
    expect(stdout).toContain('JavaScript files: 0 (0.0%)');
  }, 10000);

  it('should run CLI with JavaScript-only directory', async () => {
    const { stdout } = await execAsync(
      `node bin/ts-file-coverage --dir ${getFixturePath('javascript')}`
    );

    expect(stdout).toContain('TypeScript files: 0 (0.0%)');
    expect(stdout).toContain('JavaScript files: 3 (100.0%)');
  }, 10000);

  it('should show help when --help is used', async () => {
    const { stdout } = await execAsync('node bin/ts-file-coverage --help');

    expect(stdout).toContain('Usage:');
    expect(stdout).toContain('Options:');
    expect(stdout).toContain('-d, --dir');
  }, 5000);
});

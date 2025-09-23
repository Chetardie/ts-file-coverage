import { join } from 'path';

export const FIXTURES_PATH = join(process.cwd(), 'tests', 'fixtures');

export const getFixturePath = (...paths: string[]): string => {
  return join(FIXTURES_PATH, ...paths);
};

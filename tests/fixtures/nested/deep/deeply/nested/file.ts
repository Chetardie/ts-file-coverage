export const deeplyNestedFunction = (value: string): string => {
  return `Deeply nested: ${value}`;
};

export interface DeepConfig {
  level: number;
  path: string[];
}

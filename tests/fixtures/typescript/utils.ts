type StringOrNumber = string | number;

export const formatValue = (value: StringOrNumber): string => {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return value.trim();
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Task<T = unknown> {
  id: string;
  status: Status;
  data: T;
  createdAt: Date;
}

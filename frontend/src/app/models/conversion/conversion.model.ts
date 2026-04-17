export interface Conversion {
  id: string;
  timestamp: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  historicalDate: string;
}
import { connector } from '@/app/connector';

const API_URL = 'http://localhost:8083';

const getAllBalances = async (): Promise<object> =>
  await connector(`${API_URL}/api/v1/balances`);

export const service = {
  getAllBalances,
};

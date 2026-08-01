import { connector } from '@/app/connector';
import { authorizationHeader } from '@/app/helpers';

const API_URL = 'http://localhost:8083';

const getAllBalances = async (): Promise<object> =>
  await connector(`${API_URL}/api/v1/balances`, {
    authHeader: authorizationHeader()
  });

export const service = {
  getAllBalances,
};

import { connector } from '@/app/connector';

const API_URL = 'http://localhost:8083';

const onCreatePredication = async (accountId: string) =>
  await connector(`${API_URL}/api/v1/analyse/transactions`, {
    method: 'POST',
    data: { accountId },
  });

const getPredication = async (accountId: string) =>
  await connector(`${API_URL}/api/v1/analyse/transactions/${accountId}`);

export const service = {
  onCreatePredication,
  getPredication,
};

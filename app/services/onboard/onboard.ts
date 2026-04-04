import { connector } from '@/app/connector';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:8083';

const ingestAccounts = async (accountId: string) =>
  await connector(`${API_URL}/api/v1/access/callback`, {
    method: 'POST',
    data: { accountId },
  });

export const service = {
  ingestAccounts,
};

import { connector } from '@/app/connector';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:8083';

const handleConnectToBank = async (institutionId: string): Promise<object> =>
  await connector(`${API_URL}/api/v1/access/connect-bank`, {
    method: 'POST',
    data: { institutionId },
  });

const ingestAccounts = async (accountId: string): Promise<object> =>
  await connector(`${API_URL}/api/v1/access/callback`, {
    method: 'POST',
    data: { accountId },
  });

export const service = {
  ingestAccounts,
  handleConnectToBank,
};

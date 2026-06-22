import { connector } from '@/app/connector';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:8083';

const handleConnectToBank = async (
  institutionId: string | null
): Promise<object | any> =>
  await connector(`${API_URL}/api/v1/access/connect-bank`, {
    method: 'POST',
    data: { institutionId },
  });

const ingestAccounts = async (
  refOrRequisitionId: string | null
): Promise<object> =>
  await connector(`${API_URL}/api/v1/access/callback`, {
    method: 'POST',
    data: { requisitionId: refOrRequisitionId },
  });

export const service = {
  ingestAccounts,
  handleConnectToBank,
};

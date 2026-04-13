import { connector } from '@/app/connector';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:8083';

interface IAccount {
  accountId: string;
  ownerName: string;
}

/**
 * Small helper function to sync transactions and balances of an account
 * @param id - account id used to identify an account
 * @returns {Object} returns message
 **/
const onSyncAccount = async (id: string | null): Promise<object> => {
  await Promise.all([
    await connector(`${API_URL}/api/v1/transactions/ingest`, {
      method: 'POST',
      data: { accountId: id },
    }),
    await connector(`${API_URL}/api/v1/balances/sync`, {
      method: 'POST',
      data: { accountId: id },
    }),
  ]);

  console.log('Synced account...');

  return {
    message: 'Account data successfully synced',
  };
};

const getAccounts = async () =>
  await connector(`${API_URL}/api/v1/account/details`);

const getAccountsByAccId = async (accountId: string) =>
  await connector(`${API_URL}/api/v1/account?accountId=${accountId}`);

const updateAccountDetails = async (data: IAccount) =>
  await connector(`${API_URL}/api/v1/account/${data.accountId}`, {
    method: 'PUT',
    data: { ownerName: data.ownerName },
  });

export const service = {
  onSyncAccount,
  getAccounts,
  getAccountsByAccId,
  updateAccountDetails,
};

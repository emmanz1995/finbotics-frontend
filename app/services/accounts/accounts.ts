import { connector } from '@/app/connector';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://localhost:8083';

interface IAccount {
  accountId: string;
  ownerName: string;
}

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
  getAccounts,
  getAccountsByAccId,
  updateAccountDetails,
};

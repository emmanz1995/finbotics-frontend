import { connector } from '@/app/connector';
import { authorizationHeader } from '@/app/helpers';
import { TransactionsProps } from '@/app/transactions/[id]/page';

// TODO: there is a bug with this, we keep geeting the undefined keyword in the url, FIX IT
// const { REACT_APP_API_URL } = process.env;

const url = 'http://localhost:8083' as string;

const AuthorizationHeader = authorizationHeader();
if (AuthorizationHeader) {
  AuthorizationHeader['Content-Type'] = 'application/json' as const;
}

const getTransactions = async (
  accountId: string,
  currentPage: number,
  limit = 20
): Promise<TransactionsProps> => {
  let response: TransactionsProps;

  try {
    response = (await connector(
      `${url}/api/v1/transactions?accountId=${accountId}&limit=${limit}&currentPage=${currentPage}`,
      {
        method: 'GET',
        authHeader: authorizationHeader(),
      }
    )) as TransactionsProps;

    return response;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const onUpdateTransaction = async (body: {
  id: string;
  category?: string | null;
  comment?: string;
}) => {
  let response;

  try {
    response = await connector(`${url}/api/v1/transactions/${body.id}`, {
      method: 'PUT',
      authHeader: AuthorizationHeader,
    });
  } catch (err: any) {
    console.error('Failed to update transaction', err.message);
    throw new Error(err.message);
  }

  return response;
};

export const transactionsService = {
  getTransactions,
  onUpdateTransaction,
};

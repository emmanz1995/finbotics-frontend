import { connector } from '@/app/connector';

const API_URL: string | undefined =
  process.env.REACT_APP_API_URL || 'http://localhost:8084';

export const getInstitutions = async (
  page: number,
  limit: number
): Promise<object | any> =>
  await connector(
    `${API_URL}/api/v1/institutions/all?page=${page}&limit=${limit}`
  );

export const searchInstitutions = async (keyword: string): Promise<object> =>
  await connector(`${API_URL}/api/v1/institutions?text=${keyword}`);

export const getInstitution = async (id: string): Promise<object> =>
  await connector(`${API_URL}/api/v1/institutions/${id}`);

export const service = {
  getInstitutions,
  searchInstitutions,
  getInstitution,
};

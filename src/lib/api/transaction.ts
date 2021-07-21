import Axios from 'axios';
import {Transaction} from 'src/interfaces/transaction';

const MyriadAPI = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://34.101.124.163:3000',
});

export const storeTransaction = async (values: Transaction): Promise<Transaction> => {
  const {data} = await MyriadAPI.request<Transaction>({
    url: '/transactions',
    method: 'POST',
    data: values,
  });

  return data;
};

export const getTransaction = async (options: Partial<Transaction>): Promise<Transaction[]> => {
  const {to: userId} = options;

  const {data} = await MyriadAPI.request<Transaction[]>({
    url: '/transactions',
    method: 'GET',
    params: {
      filter: {
        where: {to: userId},
      },
    },
  });

  return data;
};

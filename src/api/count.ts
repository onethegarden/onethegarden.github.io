import apiClient from './apiClient';
import { Count } from '../models/count';
import qs from 'qs';

export const countAPI = {
  getCount: async (url: string): Promise<Count> => {
    const response = await apiClient.get<Count>(
      `/api/counts?${qs.stringify(
        {
          filters: {
            url: {
              $eq: url,
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      )}`,
    );
    return response.data;
  },
};

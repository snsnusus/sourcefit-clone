import type { AxiosRequestConfig, AxiosInstance } from 'axios';

import axios from 'axios';

export const createRequest = (config: AxiosRequestConfig): AxiosInstance =>
  axios.create(config);

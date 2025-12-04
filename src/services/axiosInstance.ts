import axios from 'axios';

import { generateUUID } from '@/utils/generateUUID';
import { getFromCookies } from '@/utils/getFromCookies';
import { showErrors } from '@/utils/showErrors';

export const AxiosAPI = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    Accept: 'application/json',
  },
});

AxiosAPI.interceptors.request.use(
  config => {
    const lang = getFromCookies('LANG');
    config.headers['Accept-Language'] = lang || 'en';

    // ------------------------------------------------------------------------------------------
    const branchId = getFromCookies('branch-id');
    config.headers['branch-id'] = branchId || '0';

    // ------------------------------------------------------------------------------------------
    const serviceId = getFromCookies('service-id');
    config.headers['service-id'] = serviceId || '';

    // ------------------------------------------------------------------------------------------
    config.headers['device-type'] = 4;

    // ------------------------------------------------------------------------------------------
    const token = getFromCookies('token');
    config.headers['Authorization'] = token ? `Bearer ${token}` : undefined;

    // ------------------------------------------------------------------------------------------
    let deviceToken = getFromCookies('deviceToken');
    if (!deviceToken) {
      deviceToken = generateUUID();
      document.cookie = `deviceToken=${deviceToken}; path=/; max-age=31536000; SameSite=Lax`;
    }
    config.headers['device-token'] = deviceToken;

    // ------------------------------------------------------------------------------------------
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
AxiosAPI.interceptors.response.use(
  response => response,
  error => {
    showErrors(error?.response?.data);
    return Promise.reject(error);
  }
);

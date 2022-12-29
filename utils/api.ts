import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const getWindowLocationOrigin = () => {
  const origin = window.location.origin;
  if (!origin) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return origin;
};

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://api.keepgrow.world' : getWindowLocationOrigin(),
  timeout: 10000, // ms 단위, 시간이 지나도 무응답일 경우 에러 ㅂ라생
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

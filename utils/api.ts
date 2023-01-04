import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import auth from './auth';
import parse from 'parse-link-header';

/**
 * window.location.origin이 없는 경우 대응
 */
const getWindowLocationOrigin = () => {
  const origin = window.location.origin;
  if (!origin) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return origin;
};

/**
 * response 전처리기
 * @param {*} response
 * - data안에 진짜 data 끄집어내기
 * - data안에 사내 자체 응답코드들 status, message, code 끄집어내기
 * - headers 파싱
 */
const preprocessResponse = (response: AxiosResponse<any>) => {
  const {
    status,
    headers,
    data: { data, ...result },
  } = response;

  const preprocessed: { xTotalCount?: number | undefined | ''; headerLinks?: parse.Links | null } = {};

  if (300 > status && status >= 200) {
    preprocessed.xTotalCount = headers['x-total-count'] && Number(headers['x-total-count']); // 총 컨텐츠 갯수
    preprocessed.headerLinks = parse(headers.link);
  }

  return {
    ...response,
    data,
    result,
    preprocessed,
  };
};

const getPredefinedHeaders = () => {
  const predefinedHeaders: { [props: string]: string } = {};
  if (process.env.NODE_ENV === 'development') {
    predefinedHeaders.Authorization = `Bearer ${auth}`;
  }
  return predefinedHeaders;
};

type patchMode = 'pay' | 'processStatistis' | 'default';

const mapBaseUrl: { [props in patchMode]: string } = {
  pay: 'http://pay.keepgrow.world',
  processStatistis: 'https://admin-supporter.keepgrow.com',
  default: 'https://api.keepgrow.world',
};
interface apiProps {
  destination?: string;
  apiPathIgnore?: boolean;
  baseUrlIgnore?: boolean;
  replaceBaseUrl?: string;
  headers?: any;
  mode?: patchMode;
  url: string;
}

/**
 *
 * @param param1 url: api 호출할 url
 * @param param2 mode: api 호출할 서버의 주소, 기본값은 default
 * @param param3 destination: api를 호출할 서버의 주소, 기본값은 /app
 * @param param4 apiPathIgnore: path 앞에 /api를 붙일지 말지 결정, 기본값은 false
 * @param param5 headers: api 호출할 때 사용할 헤더
 * @param param6 axiosOptions: axios 호출 옵션들
 */
const api = ({
  url,
  mode = 'default',
  destination = '/app/api/', // windows.getAppRoute()는 url이 /front라서 사용 불가, 강제로 admin을 바라보도록 수정
  // apiPathIgnore = false,
  headers = {
    'Content-Type': 'application/json',
  },
  ...axiosOptions
}: apiProps) => {
  let baseURL = process.env.NODE_ENV === 'development' ? mapBaseUrl[mode] : getWindowLocationOrigin();
  baseURL += destination;

  return axios({
    url,
    baseURL,
    headers: {
      ...getPredefinedHeaders(),
      ...headers,
    },
    ...axiosOptions,
  }).then(
    (response) => response,
    (error) => {
      // 응답 없는 에러의 경우 request의 속성들로 변경
      if (!error.response) {
        return Promise.reject({
          ...error,
          result: {
            message: error.message,
          },
        });
      }
      return Promise.reject(preprocessResponse(error.response));
    },
  );
};

export default api;

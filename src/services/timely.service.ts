import axios, { AxiosResponse } from "axios";
import { envsConfig, timelyUrls } from "../configs";
import { CreateProjectI, IAccessToken } from "../interfaces";
import { TimelyProjectI } from "../interfaces/timely";
import { TimelyAccountI } from "../interfaces/timely/accounts";
import { TimelyClientsI } from "../interfaces/timely/clients";
import { TimelyUsersI } from "../interfaces/timely/users";
import { TokensDb } from "../models/tokens.moldel";

const axiosService = axios.create({ baseURL: envsConfig.timelyBaseUrl });

export const timelyService = {
  createProject: (accountId: number, data: CreateProjectI): Promise<AxiosResponse<{ project: TimelyProjectI }>> =>
    axiosService.post(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`, data),

  getAccounts: (): Promise<AxiosResponse<TimelyAccountI[]>> => axiosService.get(`${timelyUrls.version}${timelyUrls.accounts}`),

  getProjects: (accountId: number): Promise<AxiosResponse<TimelyProjectI[]>> =>
    axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`),

  getCreatedHours: (path: string, accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${path}`),

  getClients: (accountId: number): Promise<AxiosResponse<TimelyClientsI[]>> =>
    axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.clients}`),

  getPeopleByAccountId: (accountId: number): Promise<AxiosResponse<TimelyUsersI[]>> =>
    axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.users}`),

  setProjectBudget: (accountId: number, projectId: number, data: { budget: number; budget_type: string }) =>
    axiosService.put(`${timelyUrls.version}/${accountId}${timelyUrls.projects}/${projectId}`, data),

  updateProjectBudget: (accountId: number, projectId: number, data: any) =>
    axiosService.patch(`${timelyUrls.version}/${accountId}${timelyUrls.projects}/${projectId}`, data),

  getTokens: (code: string) =>
    axiosService.post(`${timelyUrls.version}${timelyUrls.tokens}`, null, {
      params: {
        redirect_uri: envsConfig.timelyRedirectUrl,
        code,
        client_id: envsConfig.timelyClientId,
        client_secret: envsConfig.timelyClientSecret,
        grant_type: "authorization_code",
      },
    }),

  refreshToken: (token: string) =>
    axiosService.post(`${timelyUrls.version}${timelyUrls.tokens}`, {
      grant_type: "refresh_token",
      refresh_token: token,
      client_id: envsConfig.timelyClientId,
      client_secret: envsConfig.timelyClientSecret,
    }),
};

export const getTokens = async (): Promise<IAccessToken> => {
  const data = await TokensDb.find();
  return data[0];
};

axiosService.interceptors.request.use(async (config) => {
  // const tokens = await getTokens();
  config.headers["Content-Type"] = "application/json";
  // config.headers.Authorization = "Bearer " + tokens.access_token;
  config.headers.Authorization = "Bearer " + "jpx_XVc4C5cK3Zg4QJsYX6W0mKf7P2_5TLDUf10bBT0";
  console.log(config.headers.Authorization);

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("asldkfjhajhkfk");

      originalRequest._retry = true;

      try {
        const tokens = await getTokens();
        const { data } = await timelyService.refreshToken(tokens.refresh_token);

        await TokensDb.updateOne(
          { refresh_token: tokens.refresh_token },
          { access_toke: data.access_token, refresh_token: data.refresh_token }
        );

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

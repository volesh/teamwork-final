import axios from "axios";
import { promises as fs } from "fs";
import { envsConfig, timelyUrls } from "../configs";
import { CreateProjectI } from "../interfaces";

const axiosService = axios.create({ baseURL: envsConfig.timelyBaseUrl });

export const timelyService = {
  createProject: (accountId: number, data: CreateProjectI) =>
    axiosService.post(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`, data),

  getAccounts: () => axiosService.get(`${timelyUrls.version}${timelyUrls.accounts}`),

  getProjects: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`),

  getCreatedHours: (path: string, accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${path}`),

  getClients: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.clients}`),

  getCurrentUser: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.currentUser}`),

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

const getTokens = async () => {
  const data = await fs.readFile("./src/tokens.json");

  return JSON.parse(data.toString());
};

axiosService.interceptors.request.use(async (config) => {
  const tokens = await getTokens();
  console.log(config.baseURL, config.url);

  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = "Bearer " + tokens.access_token;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getTokens();
        const { data } = await timelyService.refreshToken(tokens.refresh_token);

        await fs.writeFile("./src/tokens.json", JSON.stringify(data));

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

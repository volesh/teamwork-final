import axios from "axios";
import { envsConfig, timelyUrls } from "../configs";
import { CreateProjectI } from "../interfaces";

const axiosService = axios.create({ baseURL: envsConfig.timelyBaseUrl });

export const timelyService = {
  createProject: (accountId: number, data: CreateProjectI) =>
    axiosService.post(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`, data),

  getAccounts: () => axiosService.get(`${timelyUrls.version}${timelyUrls.accounts}`),

  getProjects: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.projects}`),

  getCreatedHours: (path: string, accountId: number) => axiosService.put(`${timelyUrls.version}/${accountId}${path}`),

  getClients: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.clients}`),

  getCurrentUser: (accountId: number) => axiosService.get(`${timelyUrls.version}/${accountId}${timelyUrls.currentUser}`),

  setProjectBudget: (accountId: number, projectId: number, data: { budget: number; budget_type: string }) =>
    axiosService.put(`${timelyUrls.version}/${accountId}${timelyUrls.projects}/${projectId}`, data),
};

axiosService.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = "Bearer " + "VgGvnfBPk-c7oeohnQz6JEAp1AveEeyxpAwdsDNqw6I";
  console.log(config.baseURL, config.url);

  return config;
});

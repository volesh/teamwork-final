import axios from "axios";
import { envsConfig, teamworkUrls } from "../configs";
import { CreateHoursI } from "../interfaces";

const axiosService = axios.create({ baseURL: envsConfig.teamworkBaseUrl });

export const teamworkService = {
  getPeople: () => axiosService.get(`${teamworkUrls.people}.json`),
  getProjectById: (id: number) => axiosService.get(`${teamworkUrls.projects}/${id}.json`),
  getProjects: () => axiosService.get(`${teamworkUrls.projects}.json`),
  createHours: (data: CreateHoursI, projectId: number) =>
    axiosService.post(`${teamworkUrls.projects}/api/v3/projects/${projectId}/time.json`, data),
};

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = "Basic " + Buffer.from(`${envsConfig.teamworkToken}` + ":" + "password").toString("base64");

  return config;
});

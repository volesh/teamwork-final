"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamworkService = void 0;
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../configs");
const axiosService = axios_1.default.create({ baseURL: configs_1.envsConfig.teamworkBaseUrl });
exports.teamworkService = {
    getPeople: () => axiosService.get(`${configs_1.teamworkUrls.people}.json`),
    getPeopleByProject: (projectId) => axiosService.get(`${configs_1.teamworkUrls.projects}/${projectId}${configs_1.teamworkUrls.people}.json`),
    getProjectById: (id) => axiosService.get(`${configs_1.teamworkUrls.projects}/${id}.json`),
    getProjects: () => axiosService.get(`${configs_1.teamworkUrls.projects}.json`),
    createHours: (data, projectId) => axiosService.post(`${configs_1.teamworkUrls.projects}/api/v3/projects/${projectId}/time.json`, data),
};
axiosService.interceptors.request.use((config) => {
    config.headers.Authorization = "Basic " + Buffer.from(`${configs_1.envsConfig.teamworkToken}` + ":" + "password").toString("base64");
    return config;
});
//# sourceMappingURL=teamwork.service.js.map
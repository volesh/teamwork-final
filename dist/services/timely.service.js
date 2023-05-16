"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelyService = void 0;
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../configs");
const axiosService = axios_1.default.create({ baseURL: configs_1.envsConfig.timelyBaseUrl });
exports.timelyService = {
    createProject: (accountId, data) => axiosService.post(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}`, data),
    getAccounts: () => axiosService.get(`${configs_1.timelyUrls.version}${configs_1.timelyUrls.accounts}`),
    getProjects: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}`),
    getCreatedHours: (path, accountId) => axiosService.put(`${configs_1.timelyUrls.version}/${accountId}${path}`),
    getClients: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.clients}`),
    getCurrentUser: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.currentUser}`),
    setProjectBudget: (accountId, projectId, data) => axiosService.put(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}/${projectId}`, data),
};
axiosService.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = "Bearer " + "VgGvnfBPk-c7oeohnQz6JEAp1AveEeyxpAwdsDNqw6I";
    console.log(config.baseURL, config.url);
    return config;
});
//# sourceMappingURL=timely.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokens = exports.timelyService = void 0;
const axios_1 = __importDefault(require("axios"));
const configs_1 = require("../configs");
const tokens_moldel_1 = require("../models/tokens.moldel");
const axiosService = axios_1.default.create({ baseURL: configs_1.envsConfig.timelyBaseUrl });
exports.timelyService = {
    createProject: (accountId, data) => axiosService.post(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}`, data),
    getAccounts: () => axiosService.get(`${configs_1.timelyUrls.version}${configs_1.timelyUrls.accounts}`),
    getProjects: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}`),
    getCreatedHours: (path, accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${path}`),
    getClients: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.clients}`),
    getPeopleByAccountId: (accountId) => axiosService.get(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.users}`),
    setProjectBudget: (accountId, projectId, data) => axiosService.put(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}/${projectId}`, data),
    updateProjectBudget: (accountId, projectId, data) => axiosService.patch(`${configs_1.timelyUrls.version}/${accountId}${configs_1.timelyUrls.projects}/${projectId}`, data),
    getTokens: (code) => axiosService.post(`${configs_1.timelyUrls.version}${configs_1.timelyUrls.tokens}`, null, {
        params: {
            redirect_uri: configs_1.envsConfig.timelyRedirectUrl,
            code,
            client_id: configs_1.envsConfig.timelyClientId,
            client_secret: configs_1.envsConfig.timelyClientSecret,
            grant_type: "authorization_code",
        },
    }),
    refreshToken: (token) => axiosService.post(`${configs_1.timelyUrls.version}${configs_1.timelyUrls.tokens}`, {
        grant_type: "refresh_token",
        refresh_token: token,
        client_id: configs_1.envsConfig.timelyClientId,
        client_secret: configs_1.envsConfig.timelyClientSecret,
    }),
};
const getTokens = async () => {
    const data = await tokens_moldel_1.TokensDb.find();
    return data[0];
};
exports.getTokens = getTokens;
axiosService.interceptors.request.use(async (config) => {
    // const tokens = await getTokens();
    config.headers["Content-Type"] = "application/json";
    // config.headers.Authorization = "Bearer " + tokens.access_token;
    config.headers.Authorization = "Bearer " + "jpx_XVc4C5cK3Zg4QJsYX6W0mKf7P2_5TLDUf10bBT0";
    console.log(config.headers.Authorization);
    return config;
});
axios_1.default.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        console.log("asldkfjhajhkfk");
        originalRequest._retry = true;
        try {
            const tokens = await (0, exports.getTokens)();
            const { data } = await exports.timelyService.refreshToken(tokens.refresh_token);
            await tokens_moldel_1.TokensDb.updateOne({ refresh_token: tokens.refresh_token }, { access_toke: data.access_token, refresh_token: data.refresh_token });
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return (0, axios_1.default)(originalRequest);
        }
        catch (refreshError) {
            console.error(refreshError);
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
//# sourceMappingURL=timely.service.js.map
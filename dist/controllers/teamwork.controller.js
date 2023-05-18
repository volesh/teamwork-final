"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamworkController = void 0;
exports.teamworkController = {
    createProject: (req, res) => {
        console.log(req.body);
        console.log("Project created successfully");
        res.end();
    },
    createBudget: (req, res) => {
        console.log("Budget created successfully");
        res.end();
    },
    updateBudget: (req, res) => {
        console.log("Budget update successfully");
        res.end();
    },
};
//# sourceMappingURL=teamwork.controller.js.map
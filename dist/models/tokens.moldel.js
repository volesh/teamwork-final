"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensDb = void 0;
const mongoose_1 = require("mongoose");
const tokensSchema = new mongoose_1.Schema({
    access_token: { type: String, require: true },
    refresh_token: { type: String, require: true },
}, { timestamps: true });
exports.TokensDb = (0, mongoose_1.model)("Tokens", tokensSchema);
//# sourceMappingURL=tokens.moldel.js.map
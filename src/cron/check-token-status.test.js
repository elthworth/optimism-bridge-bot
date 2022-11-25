"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.APP_ENV = "test";
const globals_1 = require("@jest/globals");
const ethers_1 = require("ethers");
const config_1 = require("@src/config");
const check_token_status_1 = __importDefault(require("./check-token-status"));
(0, globals_1.test)("should get proper report", () => __awaiter(void 0, void 0, void 0, function* () {
    const l1Token = config_1.MAIN_TOKEN;
    const l1BridgeBalanceExpected = ethers_1.BigNumber.from("40000000000000000000000");
    const l2OwnerBalanceExpected = ethers_1.BigNumber.from("100000000000000000");
    const report = yield (0, check_token_status_1.default)(l1Token);
    (0, globals_1.expect)(report.l1BridgeBalance > l1BridgeBalanceExpected).toBe(true);
    (0, globals_1.expect)(report.l2OwnerBalance).toStrictEqual(l2OwnerBalanceExpected);
    (0, globals_1.expect)(report.danger).toBe(false);
}));

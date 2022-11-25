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
Object.defineProperty(exports, "__esModule", { value: true });
process.env.APP_ENV = "test";
const globals_1 = require("@jest/globals");
const erc20_client_1 = require("./erc20-client");
const ethers_1 = require("ethers");
const chains_1 = require("../types/chains");
const config_1 = require("../config");
(0, globals_1.test)("should get proper token balance", () => __awaiter(void 0, void 0, void 0, function* () {
    const owner = "0x02F19b7465c4AfF7F857fF9985e1FDfBA93c6735";
    const balanceExpected = ethers_1.BigNumber.from("145409441742139386");
    const balance = yield (0, erc20_client_1.getTokenBalance)(config_1.MAIN_TOKEN, owner, chains_1.NETWORK_LAYER.L1);
    (0, globals_1.expect)(balance).toStrictEqual(balanceExpected);
}));

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
process.env.APP_ENV = "main";
const globals_1 = require("@jest/globals");
const init_tokens_1 = __importDefault(require("./init-tokens"));
(0, globals_1.test)("should filter l2 tokens proerly", () => __awaiter(void 0, void 0, void 0, function* () {
    const l1Tokens = [
        "0x0000000000000000000000000000000000000000",
        "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "0x2b95a1dcc3d405535f9ed33c219ab38e8d7e0884",
    ];
    const l2TokensExpected = [
        "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
        "0x76FB31fb4af56892A25e32cFC43De717950c9278",
        "0x764ad60e1b81f6cacfec1a2926393d688d4493e6",
    ];
    const l2Tokens = yield (0, init_tokens_1.default)(l1Tokens);
    (0, globals_1.expect)(l2Tokens).toStrictEqual(l2TokensExpected);
}));

import dotenv from "dotenv";
import parseInitConfig from "./parse-init";
import getL2Tokens from "./init-tokens";
import { NETWORK_ENV, NETWORK_LAYER } from "@src/types/chains";

dotenv.config();

const APP_ENV = (process.env.APP_ENV || "test") as NETWORK_ENV;

const BRIDGE_CONTRACTS = {
  test: {
    l1: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8",
    l2: "0x4200000000000000000000000000000000000010",
  },
  main: {
    l1: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1",
    l2: "0x4200000000000000000000000000000000000010",
  },
};
const BRIDGE_CONTRACT = BRIDGE_CONTRACTS[APP_ENV];

const CHAIN_IDS = {
  test: {
    l1: 5,
    l2: 420,
  },
  main: {
    l1: 1,
    l2: 10,
  },
};
const CHAIN_ID = CHAIN_IDS[APP_ENV];

const RPC_ENDPOINTS = {
  test: {
    l1: "https://rpc.ankr.com/eth_goerli",
    l2: "https://goerli.optimism.io",
  },
  main: {
    l1: "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
    l2: "https://mainnet.optimism.io",
  },
};
const RPC_ENDPOINT = RPC_ENDPOINTS[APP_ENV];

const INIT_PARAMS = parseInitConfig(APP_ENV);
const L1_TOKENS = INIT_PARAMS.map((item) => item.address);
let L2_TOKENS: string[] | undefined = undefined;

const initL2Tokens = async () => {
  if (L2_TOKENS === undefined) {
    L2_TOKENS = await getL2Tokens(L1_TOKENS);
  }
  return L2_TOKENS;
};

const MINIMUM_LOCK_RATE = 120; // 120%
const MAIN_TOKEN = "0x0000000000000000000000000000000000000000";

export {
  CHAIN_ID,
  BRIDGE_CONTRACT,
  INIT_PARAMS,
  L1_TOKENS,
  RPC_ENDPOINT,
  MINIMUM_LOCK_RATE,
  MAIN_TOKEN,
  initL2Tokens,
};

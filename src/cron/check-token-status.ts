import {
  BRIDGE_CONTRACT,
  CHAIN_ID,
  initL2Tokens,
  INIT_PARAMS,
  L1_TOKENS,
  MINIMUM_LOCK_RATE,
} from "@src/config";
import { getTokenBalance } from "@src/web3/erc20-client";
import { BigNumber } from "ethers";
import { NETWORK_LAYER } from "@src/types/chains";
import { TokenStatusReport } from "../types/cron";

const checkTokenStatus = async (l1Token: string) => {
  console.info(`Checking for status of token ${l1Token}`);
  const tokenParams = getTokenParams(l1Token);
  const l2Token = await getL2Token(l1Token);
  let l1BridgeBalance: BigNumber;
  let l2OwnerBalance: BigNumber;

  l1BridgeBalance = await getTokenBalance(
    l1Token,
    BRIDGE_CONTRACT[NETWORK_LAYER.L1],
    NETWORK_LAYER.L1
  );
  l2OwnerBalance = await getTokenBalance(
    l2Token!,
    tokenParams!.optimismWallet,
    NETWORK_LAYER.L2
  );

  const report = {
    l1Chain: CHAIN_ID[NETWORK_LAYER.L1],
    l2Chain: CHAIN_ID[NETWORK_LAYER.L2],
    l1Token,
    l2Token,
    l1Bridge: BRIDGE_CONTRACT[NETWORK_LAYER.L1],
    l1BridgeBalance,
    l2Owner: tokenParams!.optimismWallet,
    l2OwnerBalance,
    danger: l1BridgeBalance < l2OwnerBalance.mul(MINIMUM_LOCK_RATE).div(100),
  } as TokenStatusReport;

  console.info(`${report.danger === true ? "Danger" : "Ok"}`);

  return report;
};

// Consider: Can be optimized by using `Object`.
const getL2Token = async (l1Token: string) => {
  const L2_TOKENS = await initL2Tokens();
  const index = L1_TOKENS.findIndex((token) => token === l1Token);
  if (index < 0) return undefined;
  return L2_TOKENS[index];
};

// Consider: Can be optimized by using `Object`.
const getL1Token = async (l2Token: string) => {
  const L2_TOKENS = await initL2Tokens();
  const index = L2_TOKENS.findIndex((token) => token === l2Token);
  if (index < 0) return undefined;
  return L1_TOKENS[index];
};

// Consider: Can be optimized by using `Object`.
const getTokenParams = (l1Token: string) => {
  const index = INIT_PARAMS.findIndex((item) => item.address === l1Token);
  if (index < 0) return undefined;
  return INIT_PARAMS[index];
};

export default checkTokenStatus;

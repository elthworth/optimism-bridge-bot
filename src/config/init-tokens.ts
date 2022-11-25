import { BRIDGE_CONTRACT, CHAIN_ID } from ".";
import { TokenListItem } from "@src/types/config";
import { NETWORK_LAYER } from "../types/chains";

const fetchTokenLists = async () => {
  const result: { tokens: TokenListItem[] } = await (
    await fetch("https://static.optimism.io/optimism.tokenlist.json")
  ).json();

  return result.tokens;
};

const filterL2Tokens = (tokenList: TokenListItem[], l1Tokens: string[]) => {
  const result: string[] = [];

  l1Tokens.forEach((l1Token) => {
    const item = tokenList.find(
      (item1) =>
        item1.address === l1Token &&
        item1.chainId === CHAIN_ID[NETWORK_LAYER.L1] &&
        item1.extensions.optimismBridgeAddress ===
          BRIDGE_CONTRACT[NETWORK_LAYER.L1]
    );

    if (item === undefined) return;

    const l2Item = tokenList.find(
      (item2) =>
        item2.chainId === CHAIN_ID[NETWORK_LAYER.L2] &&
        item2.symbol === item.symbol &&
        item2.name === item.name &&
        item2.extensions.optimismBridgeAddress ===
          BRIDGE_CONTRACT[NETWORK_LAYER.L2]
    );
    if (l2Item !== undefined) {
      result.push(l2Item.address);
    }
  });

  return result;
};

const getL2Tokens = async (l1Tokens: string[]) => {
  const tokenList = await fetchTokenLists();
  return filterL2Tokens(tokenList, l1Tokens);
};

export default getL2Tokens;

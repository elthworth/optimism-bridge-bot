import { Provider, JsonRpcProvider } from "@ethersproject/providers";
import type { Signer } from "@ethersproject/abstract-signer";
import { MAIN_TOKEN, RPC_ENDPOINT } from "@src/config";
import { Contract } from "@ethersproject/contracts";

import ERC20Json from "./abis/ERC20.json";
import { ERC20 } from "./types/ERC20";
import { NETWORK_LAYER } from "../types/chains";

const getProvider = (layer: NETWORK_LAYER) => {
  return new JsonRpcProvider(RPC_ENDPOINT[layer]);
};

const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? undefined;
  return new Contract(address, abi, signerOrProvider);
};

const getTokenContract = (address: string, layer: NETWORK_LAYER) => {
  return getContract(ERC20Json.abi, address, getProvider(layer)) as ERC20;
};

const getTokenBalance = async (
  address: string,
  owner: string,
  layer: NETWORK_LAYER
) => {
  if (address === MAIN_TOKEN) {
    return await getBalance(owner, layer);
  }
  const token = getTokenContract(address, layer);
  return await token.balanceOf(owner);
};

const getBalance = async (owner: string, layer: NETWORK_LAYER) => {
  const provider = getProvider(layer);
  return await provider.getBalance(owner);
};

export { getTokenBalance };

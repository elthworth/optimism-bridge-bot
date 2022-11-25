import { BigNumberish } from "ethers";

export type TokenBalance = {
  address: string;
  amount: BigNumberish;
};

export type TokenStatusReport = {
  l1Chain: number;
  l2Chain: number;
  l1Token: string;
  l2Token: string;
  l1Bridge: string;
  l1BridgeBalance: BigNumberish;
  l2Owner: string;
  l2OwnerBalance: BigNumberish;
  danger: boolean;
};

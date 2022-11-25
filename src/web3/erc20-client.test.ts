process.env.APP_ENV = "test";

import { expect, test } from "@jest/globals";
import { getTokenBalance } from "./erc20-client";
import { BigNumber } from "ethers";
import { NETWORK_LAYER } from "../types/chains";
import { MAIN_TOKEN } from "../config";

test("should get proper token balance", async () => {
  const owner = "0x02F19b7465c4AfF7F857fF9985e1FDfBA93c6735";
  const balanceExpected = BigNumber.from("145409441742139386");
  const balance = await getTokenBalance(MAIN_TOKEN, owner, NETWORK_LAYER.L1);

  expect(balance).toStrictEqual(balanceExpected);
});

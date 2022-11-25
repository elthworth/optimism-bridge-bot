process.env.APP_ENV = "test";

import { expect, test } from "@jest/globals";
import { BigNumber } from "ethers";
import { MAIN_TOKEN } from "@src/config";
import checkTokenStatus from "./check-token-status";

test("should get proper report", async () => {
  const l1Token = MAIN_TOKEN;
  const l1BridgeBalanceExpected = BigNumber.from("40000000000000000000000");
  const l2OwnerBalanceExpected = BigNumber.from("100000000000000000");

  const report = await checkTokenStatus(l1Token);

  expect(report.l1BridgeBalance > l1BridgeBalanceExpected).toBe(true);
  expect(report.l2OwnerBalance).toStrictEqual(l2OwnerBalanceExpected);
  expect(report.danger).toBe(false);
});

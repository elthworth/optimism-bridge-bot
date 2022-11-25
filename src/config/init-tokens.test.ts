process.env.APP_ENV = "main";

import { expect, test } from "@jest/globals";
import getL2Tokens from "./init-tokens";

test("should filter l2 tokens proerly", async () => {
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
  const l2Tokens = await getL2Tokens(l1Tokens);

  expect(l2Tokens).toStrictEqual(l2TokensExpected);
});

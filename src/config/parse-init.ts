import { ConfigParams } from "@src/types/config";
import initConfigTest from "@/init-test.json";
import initConfigMain from "@/init-main.json";

const parseInitConfig = (env: string): ConfigParams => {
  if (env === "main") return initConfigMain;
  return initConfigTest;
};

export default parseInitConfig;

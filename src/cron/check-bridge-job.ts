import fs from "fs";
import { L1_TOKENS } from "@src/config";
import { TokenStatusReport } from "@src/types/cron";
import checkTokenStatus from "./check-token-status";

const checkBridgeStatus = async () => {
  try {
    console.info("CheckBridgeStatus job started...");
    await Promise.all(
      L1_TOKENS.map(async (l1Token) => {
        outputReport(await checkTokenStatus(l1Token));
      })
    );
  } catch (err) {
    console.error(`Failed to run CheckBridgeStatus job:\n\r${err}`);
  }
};

const outputReport = (report: TokenStatusReport) => {
  const filePath = report.danger === true ? "warnings.txt" : "output.txt";
  fs.appendFileSync(
    filePath,
    `
${new Date().toString()}
${JSON.stringify(
  {
    ...report,
    l1BridgeBalance: report.l1BridgeBalance.toString(),
    l2OwnerBalance: report.l2OwnerBalance.toString(),
  },
  null,
  2
)}
  `
  );
};

export default checkBridgeStatus;

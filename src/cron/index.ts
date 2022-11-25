import * as schedule from "node-schedule";
import checkBridgeStatus from "./check-bridge-job";

const initCheckBridgeStatusJob = () => {
  checkBridgeStatus();
  schedule.scheduleJob("0 */3 * * *", checkBridgeStatus);
};

const initCronJobs = () => {
  initCheckBridgeStatusJob();
};

export default initCronJobs;

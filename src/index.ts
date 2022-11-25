import initCronJobs from "./cron";

const main = async () => {
  console.info("Starting application...");
  initCronJobs();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

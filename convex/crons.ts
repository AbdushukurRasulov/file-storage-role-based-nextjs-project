import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("Delete any old files marked for deletion", { minutes: 100 }, internal.files.deleteAllFiles);

export default crons;

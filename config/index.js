import { initMongoDB } from "./dbConn.js";
import dotenv from "dotenv";

export function initializeConfigurations() {
  dotenv.config();
  initMongoDB();
}

import mongoose from "mongoose";
import config from "./config";

const connection = mongoose.connect(config.getConfig('mongodbStr') as string);
export default connection
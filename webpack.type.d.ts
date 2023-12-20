import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export type Configuration = WebpackConfiguration & {
  devServe?: DevServerConfiguration;
};

export type WebpackConfigEnv = {
  [key: string]: boolean | number | string;
  production: boolean;
  development: boolean;
};

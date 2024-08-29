import { JSONSchema4 } from "json-schema";

export type IBotConfig<T = JSONSchema4> = {
  schema: T;
};
export type IBot<ConfigSchema = JSONSchema4, ConfigValue = any> = {
  id: string;
  trigger: string;
  config: IBotConfig;
  instructions: (prompt: string, config: ConfigValue) => Promise<string[]>;
  output: {
    processor: (str: string) => Promise<IBotOutput>;
  };
};

export type IBotOutput = {
  raw: string;
  formatted: string;
  actions: IBotAction[];
  summary: IBotSummary;
};

export type IBotAction = {
  type:
    | "INSERT_WHITEBOARD_ELEMENT"
    | "UPDATE_FILE"
    | "CREATE_FILE"
    | "APPLY_DIFF";
};

export type IBotSummary = {
  formatted: string;
};

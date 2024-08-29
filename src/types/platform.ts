export enum IPlatformComponentType {
  "APP" = "APP",
  "PLUGIN" = "PLUGIN",
  "BOT" = "BOT",
}

export type IPlatformComponentMeta = {
  name: string;
  avatar?: string;
  url?: string;
  repo?: string;
  authors?: { name: string; url: string; avatar: string }[];
};

export type IPlatformComponent = {
  id: string;
  type: IPlatformComponentType;
  meta: IPlatformComponentMeta;
  export: string;
  capabilities: string[];
};

export type IPlatformAdvertisment = {
  meta: IPlatformComponentMeta;
  components: IPlatformComponent[];
};

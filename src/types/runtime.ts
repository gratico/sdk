export type IFs = any;

export interface ImportShim {
  addImportMap: Function;
  getImportMap: Function;
  _r: { [id: string]: any };
  (moduleName: string): any;
}

export type IPackageLock = {
  name?: string;
  version?: string;
  lockfileVersion: number;
  requires?: boolean;
  packages: {
    [key: string]: Omit<IPackageLockDetails, "location">;
  };
};

export type IPackageLockDetails = {
  version: string;
  name?: string;
  resolved?: string;
  integrity?: string;
  dev?: boolean;
  optional?: boolean;
  link?: boolean;
  os?: string[];
  location: string;
  cpu?: string[];
  dependencies?: {
    [packageName: string]: string;
  };
};

export type IPackage = {
  type: "local" | "remote" | "symlink";
  location: string;
  name: string;
  pkgDetail: IPackageLockDetails;
  manifest: IPackageManifest;
  deps: Set<IPackage>;
};

export type IPackageManifest = {
  name: string;
  version: string;
  module?: string;
  main?: string;
  browser?: string;
  exports?: Record<
    string,
    { browser?: string; import?: string | { default?: string } }
  >;
  dependencies: { [name: string]: string };
  devDependencies: { [name: string]: string };
  "platform.advertisment"?: boolean;
};

export type IRuntimeFetchers = {
  [host: string]: {
    fetcher: Function;
    resolver: Function;
  };
};

export type IRuntime = {
  import: ImportShim;
  importSpecifier: Function;
  pkgs: IPackage[];
  fetchers: IRuntimeFetchers;
  builtins: Record<string, any>;
};

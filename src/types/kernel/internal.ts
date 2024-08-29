export type IGossipChannel = any;

export type IDBQueryOptions = any;

export type IDB = {
  query: (tableName: string, params: IDBQueryOptions, type?: string) => any;
  rpc: Function;
};

export type ICacheFetcher<T = unknown> = (checkpoint: string) => Promise<{
  checkpoint: string;
  data: T[];
}>;
export type ICacheStore<T = unknown> = {
  get(k: string): Promise<T>;
  getAll(): Promise<T[]>;
  fetcher: ICacheFetcher<T>;
  storage: any;
  refresh: () => Promise<void>;
  meta: any;
};

export type ICache = {
  createStore: (key: string, fetcher: ICacheFetcher) => Promise<ICacheStore>;
  stores: {
    [key: string]: ICacheStore;
  };
};

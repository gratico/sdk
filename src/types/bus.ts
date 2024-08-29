export type IBusAdapter = {
  postMessage: Function;
};
export type IBusMessage = {
  type: "@gratico/bus";
  payload: {
    from: string;
    to: string;
    data:
      | {
          type: "request";
        }
      | {
          type: "response";
        };
  };
};
export interface IBus {
  adapters: {
    [type: string]: IBusAdapter;
  };
  channels: Map<string, any>;
  peers: Map<string, IPeer>;
  state: object;
  pendingRequests: Map<string, Promise<any>>;
}

export interface IPeer {
  id: string;
  type: string;
  meta: object;
  api: any;
}

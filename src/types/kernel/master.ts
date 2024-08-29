import { StoreCursor } from "alfama";
import {
  IBootParams,
  IBuffer,
  IBufferRouteParams,
  IBuffers,
  ICheckout,
  IPeers,
  IRealtimeProvider,
  IThreads,
  IViewport,
} from "../objects";
import { IBaseKernel, IBaseKernelAPI } from "./base";
import { IDB, IGossipChannel, ICache } from "./internal";

export interface IMasterKernel extends IBaseKernel {
  db: IDB;
  cache: ICache;

  ws: WebSocket;

  gossipChannel?: IGossipChannel;
  peers: IPeers[];

  viewports: IViewport[];
  bootViewport: (params: IBootParams) => Promise<IViewport>;
  shutdownViewport: (viewportId: string) => Promise<void>;
  $buffers: StoreCursor<IBuffers>;
  $threads: StoreCursor<IThreads>;
  realtimeRegistry: Map<string, IRealtimeProvider>;

  checkouts: {
    refs: {
      [refName: string]: ICheckout;
    };
  };
}

export interface IMasterKernelAPI extends IBaseKernelAPI {
  kernel: IMasterKernel;

  bootViewport: (params: IBootParams) => Promise<IViewport>;
  shutdownViewport: (viewportId: string) => Promise<void>;

  getCheckouts(): Promise<{ id: string }[]>;
  createCheckout(
    projectId: string,
    params: { refName: string }
  ): Promise<{ id: string }>;
  getOrCreateCheckout(
    projectId: string,
    params: { refName: string }
  ): Promise<{ id: string }>;

  getNodes(
    projectId: string,
    ref: string,
    path: string,
    cursor: string[]
  ): Promise<void>;

  createFile(
    checkoutId: string,
    path: string,
    contents: { contents: string }
  ): Promise<{ data: boolean } | Error>;
  createDirectory(
    checkoutId: string,
    path: string
  ): Promise<{ data: boolean } | Error>;
  getFile(
    checkoutId: string,
    path: string,
    encoding?: string
  ): Promise<{ data: Uint8Array | string } | Error>;

  getOpenBuffers(): Promise<IBuffer[]>;
  getOpenBuffer(id: IBufferRouteParams): Promise<IBuffer | undefined>;
  openBuffer(buffer: IBufferRouteParams): Promise<IBuffer>;
  updateBuffer(bufferId: string, contents: any): Promise<IBuffer>;
  saveBuffer(id: string): Promise<IBuffer>;

  startLSP(params: { ref: string; path: string }): Promise<void>;
  getLSPDiagnostics(params: { ref: string }): Promise<void>;
  executeLSPCommand(params: { ref: string }): Promise<void>;

  runtimeFetchImportMap(params: any): Promise<any>;
  runtimeResolveFile(
    checkoutId: string,
    importName: string,
    parentUrl: string
  ): Promise<any>;
  runtimeFetchFile(checkoutId: string, url: string): Promise<any>;

  updateLSPFile(params: any): Promise<any>;
  getLints(params: { path: string }): Promise<any>;
  getHover(params: { path: string; pos: any }): Promise<any>;
  getAutocompletion(params: {
    path: string;
    context: {
      pos: any;
      explicit: any;
    };
  }): Promise<any>;
}

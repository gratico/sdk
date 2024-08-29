import { ObjPathProxy, StoreCursor } from "alfama";

import { IBus } from "../bus";
import { IFs, IRuntime } from "../runtime";
import { IBootParams, IKernelState } from "../objects/index";
import Emittery from "emittery";

export type IPubSubDebugOptions = {
  ack?: boolean;
  request?: boolean;
  reply?: boolean;
  publish?: boolean;
  receive?: boolean;
  process?: boolean;
};
export type IPubSub = {
  id: string;
  debug: IPubSubDebugOptions;
  localChannel: BroadcastChannel;
  handler: EventListenerOrEventListenerObject;
  publish: (topic: string, data: unknown) => void;
  reply: (topic: string, fn: Function) => void;
  destroy: Function;
  request: <Payload = any, Data = any>(
    topic: string,
    data: Payload
  ) => Promise<Data>;
  emitter: Emittery;
  requestHandlers: Map<string, Function>;
  pendingMessages: Map<string, { resolve: Function; reject: Function }>;
  pendingRequests: Map<string, { resolve: Function; reject: Function }>;
};
export interface IBaseKernel {
  id: string;
  params: IBootParams;
  booted: boolean;
  cacheMap: Map<any, any>;
  state: ObjPathProxy<IKernelState, IKernelState>;
  localChannel: BroadcastChannel;
  runtimes: Map<string, IRuntime>;
  messageBus: IBus;
  eventBus: any;
  pubsub: IPubSub;
  destroy: Function;
  //  handlers: Set<any>;
}

export interface IBaseKernelAPI {
  kernel: IBaseKernel;
}

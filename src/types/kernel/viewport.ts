import { IBaseKernel, IBaseKernelAPI } from "./base";
import { IMasterKernelAPI } from "./master";

export interface IViewportKernel extends IBaseKernel {
  buffers: any[];
  master: IMasterKernelAPI;
  masterId: string;
}

export type IKernel = IViewportKernel;

export interface IViewportKernelAPI extends IBaseKernelAPI {
  kernel: IViewportKernel;
}

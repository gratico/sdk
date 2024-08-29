import { ObjPathProxy, StoreCursor } from "alfama";

export enum MessageType {
  QUERY_STATE,
  APPLY_UPDATE,
  QUERY_AWARENESS,
  UPDATE_AWARENESS,
}

export type IRealtimeMessage<T = any> = {
  id: string;
  type: MessageType;
  data?: T;
  from?: string;
  to?: string;
  createdAt: number;
};

export interface IRealtimeProvider<Doc = any, Message = any, Awareness = any> {
  id: string;
  docId: string;
  type: string;
  doc: Doc;
  awareness: Awareness;
  receiveMessage: (msg: Message) => void;
  sendMessage: (msg: Message) => Promise<void>;
  queryState: Function;
  destroy: Function;
  applyUpdate: Function;
}

export type IFolderMeta = {
  files: {
    [name: string]: IFileMeta;
  };
};

export type IFileIcon =
  | {
      type: "url";
      value: string;
    }
  | { type: "pack"; value: string; pack?: string };

export type IFileMeta = {
  name: string;
  description: string;
  tags: string[];
  icon?: IFileIcon;
  meta: Record<string, any>;
  timestamps: { created: number; updated: number };
};

export type IProject = {
  id: string;
  userId: string;
  slug?: string;
  name: string;
};

export type IUser = {
  id: string;
  name: string;
  username?: string;
  anon?: boolean;
};

export type IThread = {
  id: string;
  slug: string;
  name: string;
  userIds: string[];
  userId: string;
  meta: Record<string, any>;
};
export type IThreads = {
  list: { [id: string]: IThread };
};

export enum IBufferType {
  YJS = "yjs",
  ALFAMA = "alfama",
}

export type IFileBuferRouteParams = {
  type: IBufferType;
  projectId: string;
  branch: string;
  path: string;
};

export type IBufferRouteParams = IFileBuferRouteParams;

export interface IBufferBase {
  type: IBufferType;
  loaded?: true;
}

export interface IFileBuffer extends IBufferBase {
  id: string;
  icon: string;
  type: IBufferType;
  projectId: string;
  ref: string;
  path: string;
  createdAt: number;
}

export type IBuffer = IFileBuffer;

export type IBuffers = {
  list: { [id: string]: IBuffer };
};

export type IActiveBuffer = {
  activeBufferId?: string;
};

export type IBuffersState = IBuffers & IActiveBuffer;

export type ILoggedoutSession = {
  loggedIn: false;
};

export type IBaseSession = {
  loggedIn: boolean;
  project: IProject;
};

export type ILoggedinSession = {
  loggedIn: true;
  project: IProject;
  user: IUser;
} & IBaseSession;

export type IUserSession = ILoggedinSession | ILoggedoutSession;

export type IBootParams = {
  session: ILoggedinSession;
  threads: any[];
};

export interface IViewport {
  id: string;
  params: IBootParams;
  masterId: string;
}

export type IRepoRef = {
  type: "branch";
  value: string;
};

export interface ICheckout<IFs = any> {
  id: string;
  fs: IFs;
  ref: IRepoRef;
  $tree: StoreCursor<TreeNode, TreeNode>;
}

export type TreeNode<T = any> = {
  name: string;
  path: string;
  type: string;
  icon: string;
  meta?: T;
  children: TreeNode[];
  isDirectory: boolean;
  state: { loaded?: boolean };
};

export type IKernelState = { [key: string]: any };

export interface IPeers {
  id: string;
}

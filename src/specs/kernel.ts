import { IFileSystem } from "@gratico/fs";
import { BroadcastChannel } from "broadcast-channel";
import { IProject, IUser } from "./business";
import { PackageManager } from "@gratico/runtime";
import React from "react";
export interface LocalParams {
	file: string;
	path: string;
	type: "~";
}
export type FileParams = LocalParams; // | GITParams

export interface IKernelConfig {
	viewer?: IUser;
	project: IProject;
}
export interface IKernel<T = any> {
	id: string;
	config: IKernelConfig;
	state: IKernelState;
	fs: IFileSystem;
	ipc: BroadcastChannel;
	pm: PackageManager;
	api: T;
	extensions: {
		[capability: string]: {
			pkgName: string;
			advt: IKernelExtensionAdvertisment;
		}[];
	};
}

export type NPMHostedIcon = {
	type: "npm";
	packageName: string;
	packageVersion?: string;
	path: string;
	iconType?: "svg";
};
export type RawIcon = {
	type: "raw";
	content: string;
	iconType: "svg" | "png";
};
export type FileNameDependentIcon = {
	type: "file";
	path: string;
};
export type Icon = NPMHostedIcon | RawIcon | FileNameDependentIcon;

export type TreeNodeType = "root" | "dir" | "file" | "submodule";

export type DBRecord<T = any> = {
	id: string;
	rev: string;
	type: TreeNodeType;
	name: string;
	parentId?: string;
	ancestorIds: string[];
	score?: string;
	applicationId?: string;
	icon?: Icon;
};

export type TreeNode<T = any> = {
	attrs: DBRecord<T>;
	state: Record<string, any>;
};
export interface RootChildrenFetcher {
	type: string;
	fetchChildren: (parentNode: TreeNode) => Promise<TreeNode[]>;
}

export interface ISession {
	id: string;
	applicationId: string;
	node: TreeNode;
	ancestors: TreeNode[];
	state: Record<string, any>;
}

export interface IKernelState {
	startup: {
		boot?: true | Error;
	};
	workspace: {
		activeSessionId?: string;
		[key: string]: any;
	};
	sessions: { [id: string]: ISession };
	sessionData: { [id: string]: ISessionData };
	nodes: { [id: string]: TreeNode };
}

export interface ISessionData {
	[key: string]: any;
}

export interface IApplication {
	matchNode: (node: TreeNode, parentNodes: TreeNode[]) => void;
	render: (kernel: IKernel, session: ISession, dom: HTMLElement) => void;
}

export interface IKernelExtensionMeta {
	name: string;
	description?: string;
	icon?: Icon;
	homepage?: string;
	author?: string;
	repository?: string;
}

export interface IKernelExtensionAdvertisment {
	id: string;
	meta: IKernelExtensionMeta;
	capability: string;
	moduleLocation?: any;
	exportName?: string;
}

export interface IExtension {
	id: string;
}
export interface IGUIApplication extends IExtension {
	matchFile?: (kernel: IKernel, filePath: string) => number;
	renderApplication: (kernel: IKernel, session: ISession) => any;
}

export type IconPlaceholderRenderer = () => React.ReactNode;
export interface IconRendererProps {
	icon: Icon;
	size: number;
	placeholder?: IconPlaceholderRenderer;
}

export interface IIconPack extends IExtension {
	stylesheets: string[];
	renderIcon: (props: IconRendererProps) => any;
}

export interface IFileTree extends IExtension {
	renderTree: (kernel: IKernel, props: any) => any;
}

export interface IVCSProvider extends IExtension {
	attributes: Record<string, any>;
	clone: () => void;
	writeFile: () => void;
}

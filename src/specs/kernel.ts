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

export type DBRecord<T = any> = {
	id: string;
	rev: string;
	parentId: string;
	score: string;
	type: string;
	label: string;
	applicationId?: string;
	icon?: Icon;
	expandable?: boolean;
	payload: T;
};

export type TreeNode<T = any> =
	| {
			type: "db";
			id: string;
			parentId: string;
			score: string;
			rev: string;
			attrs: DBRecord<T>;
			meta?: Record<string, any>;
			state: Record<string, any>;
	  }
	| { type: "file"; id: string; state: Record<string, any> }
	| { type: "dir"; id: string; state: Record<string, any> }
	| { type: "root"; id: string; label: string };

export interface RootChildrenFetcher {
	type: string;
	fetchChildren: (parentNode: TreeNode) => Promise<TreeNode[]>;
}

export interface ISession {
	id: string;
	applicationId: string;
	treeNodeId: string;
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
	nodes: { [id: string]: TreeNode };
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

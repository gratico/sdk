import { IFileSystem } from '@gratico/fs'
import { BroadcastChannel } from 'broadcast-channel'
import { IProject, IUser } from './business'

export interface LocalParams {
	file: string
	path: string
	type: '~'
}
export type FileParams = LocalParams // | GITParams

export interface IKernelConfig {
	viewer?: IUser
	project: IProject
}
export interface IKernel<T = any> {
	id: string
	config: IKernelConfig
	state: IKernelState
	fs: IFileSystem
	ipc: BroadcastChannel
	api: T
	extensions: []
}

export type NPMHostedIcon = {
	type: 'npm'
	packageName: string
	packageVersion?: string
	path: string
	iconType: 'svg'
}
export type RawIcon = {
	type: 'raw'
	content: string
	iconType: 'svg' | 'png'
}
export type Icon = NPMHostedIcon | RawIcon

export interface TreeNode {
	id: string
	parentId: string
	score: string
	type: string
	label: string
	icon?: Icon
	expandable?: boolean
	meta?: Record<string, any>
	state: Record<string, any>
}

export interface RootChildrenFetcher {
	type: string
	fetchChildren: (parentNode: TreeNode) => Promise<TreeNode[]>
}

export interface ISession {
	id: string
	applicationId: string
	treeNodeId: string
	state: Record<string, any>
}

export interface IKernelState {
	startup: {
		boot?: true | Error
	}
	sessions: { [id: string]: ISession }
	nodes: { [id: string]: TreeNode }
}

export interface IApplication {
	matchNode: (node: TreeNode, parentNodes: TreeNode[]) => void
	render: (kernel: IKernel, session: ISession, dom: HTMLElement) => void
}

export interface IKernelExtensionMeta {
	name: string
	description?: string
	icon?: Icon
	homepage?: string
	author?: string
	repository?: string
}

export interface IKernelExtensionAdvertisment {
	id: string
	meta: IKernelExtensionMeta
	capabilities: string[]
	moduleLocation?: any
	exportName?: string
}

export interface IExtension {
	id: string
}
export interface IGUIApplication extends IExtension {
	matchFile?: (kernel: IKernel, filePath: string) => number
	renderApplication: (kernel: IKernel, session: ISession) => any
}
export interface IIconPack extends IExtension {
	renderIcon: (kernel: IKernel, props: any) => any
}

export interface IFileTree extends IExtension {
	renderTree: (kernel: IKernel, props: any) => any
}

export type IProject = { id: string; slug: string }
export type IUser = { id: string; username: string }
export type IRepository = any

export interface IFileBuffer {
  id: string
  workspaceUID: string
  applicationId: string
  args: Record<any, any>[]
  branchName?: string
  repoName?: string
  filePath?: string
}

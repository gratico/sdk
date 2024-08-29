import { IBufferRouteParams, IBufferType } from "./types/objects";

export function getBufferIdFromRouterParams(
  params: IBufferRouteParams
): string {
  return `${params.projectId}:${params.branch}:${params.path}`;
}

export * from "./types/index";

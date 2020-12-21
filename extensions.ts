import {
  IKernelManifest,
  IKernelManifestMeta,
  IKernelManifestAdvertisment,
  IKernelExtension,
} from "@gratico/microkernel";

export function createReactApplicationExtension() {}

export function createExtension(
  id: string,
  name: string,
  meta: Omit<IKernelManifestMeta, "name">,
  advt: IKernelManifestAdvertisment,
  mod: any
): IKernelExtension {
  return {
    manifest: {
      id,
      meta: {
        name,
        ...meta,
      },
      advt,
    },
    export: mod,
  };
}

export default {};

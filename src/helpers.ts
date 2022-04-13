import { IKernel, IKernelExtensionAdvertisment } from "./specs";
export async function resolveModule(
	kernel: IKernel,
	pkgName: string,
	advt: IKernelExtensionAdvertisment
) {
	const mod = await kernel.pm.getModule(pkgName);
	return mod[advt.exportName || "__default"];
}
export async function getExtension(kernel: IKernel, capability: string) {
	const list = kernel.extensions[capability];
	if (list && list.length > 0) {
		const item = list[0];
		return resolveModule(kernel, item.pkgName, item.advt);
	}
}

export async function getExtensions(kernel: IKernel, capability: string) {
	const list = kernel.extensions[capability];
	if (list && list.length > 0) {
		return Promise.all(
			list
				.map(async (item) => {
					return resolveModule(kernel, item.pkgName, item.advt);
				})
				.filter((el) => el)
		);
	}
}

import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjFOF2Lv.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSiteOrigin_createServerFn_handler = createServerRpc({
	id: "e9edbc41c1cdf4994dbd2fcf19b6e13d92d2ac54745f49f139077a3e05a13c24",
	name: "getSiteOrigin",
	filename: "src/routes/index.tsx"
}, (opts) => getSiteOrigin.__executeServer(opts));
var getSiteOrigin = createServerFn({ method: "GET" }).handler(getSiteOrigin_createServerFn_handler, async () => {
	const { getRequestUrl } = await import("./ssr.mjs").then((n) => n.o).then((n) => n.t);
	return getRequestUrl().origin;
});
//#endregion
export { getSiteOrigin_createServerFn_handler };

export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-3b6d4e22.js","imports":["_app/immutable/start-3b6d4e22.js","_app/immutable/chunks/index-f0abc3e3.js","_app/immutable/chunks/singletons-b462b5d1.js","_app/immutable/chunks/parse-d12b0d5b.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/web-hooks/atlassian",
				pattern: /^\/api\/web-hooks\/atlassian\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/web-hooks/atlassian/_server.ts.js')
			},
			{
				id: "/task-viewer",
				pattern: /^\/task-viewer\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: () => import('../output/server/entries/endpoints/task-viewer/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

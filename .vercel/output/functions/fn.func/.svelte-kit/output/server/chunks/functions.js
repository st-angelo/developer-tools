const PUBLIC_ATLASSIAN_CLOUD_URL = "https://megid.atlassian.net";
function getAtlassianIssueUrl(key) {
  return `${PUBLIC_ATLASSIAN_CLOUD_URL}/browse/${key}`;
}
function getTasksOptionsFromSearchParams(searchParams) {
  const appCode = searchParams.get("appCode");
  const route = searchParams.get("route");
  const completed = Number(searchParams.get("completed") || void 0);
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));
  const orderBy = searchParams.get("orderBy");
  const direction = searchParams.get("direction");
  const taskKeys = ["added", "appCode", "completed", "id", "issueKey", "route"];
  return {
    appCode,
    route,
    completed: !Number.isNaN(completed) ? Boolean(completed) : void 0,
    skip: (page - 1) * (size || 5) || 0,
    take: size && size <= 5 ? size : 5,
    orderBy: taskKeys.some((key) => key === orderBy) ? orderBy : "added",
    direction: direction === "asc" || direction === "desc" ? direction : "asc"
  };
}
function errorResponse(content, persistent) {
  return {
    message: {
      type: "error",
      content,
      persistent
    }
  };
}
export {
  PUBLIC_ATLASSIAN_CLOUD_URL as P,
  getTasksOptionsFromSearchParams as a,
  errorResponse as e,
  getAtlassianIssueUrl as g
};

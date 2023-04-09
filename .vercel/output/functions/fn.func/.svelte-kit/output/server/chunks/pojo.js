import { w as writable } from "./index2.js";
import { f as get_store_value } from "./index3.js";
const issueCacheStore = writable([]);
function get(key) {
  return get_store_value(issueCacheStore).find((cached) => cached.key === key);
}
function set(issue) {
  issueCacheStore.update((prev) => [...prev.filter((cached) => cached.key !== issue.key), issue]);
  return issue;
}
function remove(key) {
  issueCacheStore.update((prev) => prev.filter((cached) => cached.key !== key));
}
const IssueCache = {
  get,
  set,
  remove
};
class PojoUtil {
  static getTaskDto(task, issue) {
    return {
      id: task.id,
      appCode: task.appCode,
      route: task.route,
      issueKey: task.issueKey,
      completed: task.completed,
      issue
    };
  }
  static getIssueDto(issue) {
    return {
      id: issue.id,
      key: issue.key,
      fields: {
        summary: issue.fields.summary,
        issuetype: issue.fields.issuetype && {
          id: issue.fields.issuetype.id,
          name: issue.fields.issuetype.name,
          description: issue.fields.issuetype.description,
          iconUrl: issue.fields.issuetype.iconUrl
        },
        status: {
          id: issue.fields.status.id,
          name: issue.fields.status.name,
          description: issue.fields.status.description,
          iconUrl: issue.fields.status.iconUrl
        },
        assignee: issue.fields.assignee && {
          displayName: issue.fields.assignee.displayName,
          emailAddress: issue.fields.assignee.emailAddress,
          avatarUrls: issue.fields.assignee.avatarUrls
        },
        creator: {
          displayName: issue.fields.creator.displayName,
          emailAddress: issue.fields.creator.emailAddress,
          avatarUrls: issue.fields.creator.avatarUrls
        },
        reporter: {
          displayName: issue.fields.reporter.displayName,
          emailAddress: issue.fields.reporter.emailAddress,
          avatarUrls: issue.fields.reporter.avatarUrls
        },
        priority: {
          id: issue.fields.priority.id,
          name: issue.fields.priority.name,
          description: issue.fields.priority.description,
          iconUrl: issue.fields.priority.iconUrl
        },
        projectName: issue.fields.project?.name
      }
    };
  }
}
export {
  IssueCache as I,
  PojoUtil as P
};

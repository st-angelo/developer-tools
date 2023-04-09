import { I as IssueCache, P as PojoUtil } from "../../../chunks/pojo.js";
import { P as PUBLIC_ATLASSIAN_CLOUD_URL, a as getTasksOptionsFromSearchParams, e as errorResponse } from "../../../chunks/functions.js";
import { Version3Client } from "jira.js";
import { PrismaClient } from "@prisma/client";
import { f as fail } from "../../../chunks/index.js";
const ATLASSIAN_EMAIL = "angelostatescu@gmail.com";
const ATLASSIAN_TOKEN = "ATATT3xFfGF062OS-QWAqYs9auD1m_TErrocxFt8dZQavGMOMhNLjStXrKRgR17-oL_XZQCUe0c9wlU9UrRtWRAkigGrP7zAo7rOBvI9hAxP93Jm3O-E6-ujiFFQv0CLUv9mJQUtasqATw0EEUab26bw2rzhH2RWcLH-vtTnGhZomp8pmpgo5AA=CB533E29";
const client = new Version3Client({
  host: PUBLIC_ATLASSIAN_CLOUD_URL,
  authentication: {
    basic: {
      email: ATLASSIAN_EMAIL,
      apiToken: ATLASSIAN_TOKEN
    }
  }
});
async function getIssue(key) {
  let cachedIssue = IssueCache.get(key);
  if (!cachedIssue) {
    try {
      const issue = await client.issues.getIssue({ issueIdOrKey: key });
      cachedIssue = IssueCache.set(PojoUtil.getIssueDto(issue));
    } catch (err) {
      console.error(err);
      return {
        status: "error",
        error: "Could not retrieve a valid issue from Atlassian"
      };
    }
  }
  return {
    status: "success",
    data: cachedIssue
  };
}
const prisma = new PrismaClient({
  log: ["error"]
});
async function getTasks({
  appCode,
  route,
  completed,
  skip,
  take,
  direction
}) {
  if (!appCode || !route)
    return {
      status: "success",
      data: {
        total: 0,
        tasks: []
      }
    };
  try {
    const total = await prisma.task.count({
      where: { appCode, route, completed }
    });
    const tasks = await prisma.task.findMany({
      where: { appCode, route, completed },
      skip,
      take,
      orderBy: { added: direction }
    });
    return {
      status: "success",
      data: {
        total,
        tasks
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Could not retrieve tasks from the database"
    };
  }
}
async function getProjectXCompletedStatuses() {
  try {
    const projectXCompletedStatuses = await prisma.projectXCompletedStatus.findMany();
    return {
      status: "success",
      data: projectXCompletedStatuses
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Could not retrieve the collection of completed statuses for each project"
    };
  }
}
async function addTask({
  appCode,
  route,
  issueKey,
  completed,
  removeOnCompleted
}) {
  try {
    const existing = await prisma.task.count({ where: { appCode, route, issueKey } });
    if (existing === 0) {
      await prisma.task.create({ data: { appCode, route, issueKey, completed, removeOnCompleted } });
      return {
        status: "success",
        data: null
      };
    } else {
      return {
        status: "error",
        error: "An issue with this key is already configured for this route"
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Could not add task"
    };
  }
}
async function removeTask(id) {
  try {
    const result = await prisma.task.delete({ where: { id } });
    if (!result) {
      return {
        status: "error",
        error: "No task was removed"
      };
    }
    return {
      status: "success",
      data: null
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      error: "Could not remove task"
    };
  }
}
async function getTaskDtos(options) {
  const tasksResponse = await getTasks(options);
  if (tasksResponse.status === "error")
    return {
      status: "error",
      error: tasksResponse.error
    };
  const tasks = tasksResponse.data.tasks;
  const dtos = [];
  const issuePromises = tasks.map(
    (task) => getIssue(task.issueKey).then((issueResponse) => {
      if (issueResponse.status === "success")
        dtos.push(PojoUtil.getTaskDto(task, issueResponse.data));
      else
        dtos.push(PojoUtil.getTaskDto(task, null));
    })
  );
  await Promise.allSettled(issuePromises);
  return {
    status: "success",
    data: {
      total: tasksResponse.data.total,
      tasks: dtos
    }
  };
}
const load = async (event) => {
  const options = getTasksOptionsFromSearchParams(event.url.searchParams);
  const taskDtosResponse = await getTaskDtos(options);
  if (taskDtosResponse.status === "error")
    return {
      error: taskDtosResponse.error,
      tasks: null,
      total: 0
    };
  else
    return {
      tasks: taskDtosResponse.data.tasks,
      total: taskDtosResponse.data.total
    };
};
const actions = {
  addTask: async ({ request }) => {
    const formData = await request.formData();
    const appCode = formData.get("appCode")?.toString();
    const route = formData.get("route")?.toString();
    const issueKey = formData.get("issueKey")?.toString();
    const removeOnCompleted = formData.get("removeOnCompleted")?.toString() === "on" ? true : false;
    if (!appCode || !route || !issueKey)
      return fail(400, errorResponse("Could not add task. Invalid input."));
    const issueResponse = await getIssue(issueKey);
    if (issueResponse.status === "error")
      return fail(400, errorResponse(issueResponse.error));
    const projectXCompletedStatusesResponse = await getProjectXCompletedStatuses();
    if (projectXCompletedStatusesResponse.status === "error")
      return fail(400, errorResponse(projectXCompletedStatusesResponse.error));
    const issue = issueResponse.data;
    const completed = projectXCompletedStatusesResponse.data.some(
      (pxcs) => pxcs.projectName === issue.fields.projectName && pxcs.statusName === issue.fields.status.name
    );
    if (removeOnCompleted && completed) {
      return fail(400, errorResponse("The task is already marked as completed."));
    }
    const addTaskResponse = await addTask({
      appCode,
      route,
      issueKey,
      completed,
      removeOnCompleted
    });
    if (addTaskResponse.status === "error")
      return fail(400, errorResponse(addTaskResponse.error));
  },
  removeTask: async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get("id"));
    if (!id)
      return fail(400, errorResponse("Invalid task id"));
    const removeTaskResponse = await removeTask(id);
    if (removeTaskResponse.status === "error")
      return fail(400, errorResponse(removeTaskResponse.error));
  }
};
export {
  actions,
  load
};

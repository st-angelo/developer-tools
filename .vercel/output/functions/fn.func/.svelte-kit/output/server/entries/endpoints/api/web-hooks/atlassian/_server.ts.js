import { P as PojoUtil, I as IssueCache } from "../../../../../chunks/pojo.js";
import { I as IssueQueue } from "../../../../../chunks/issueQueueStore.js";
async function POST(event) {
  try {
    const issueResponse = await event.request.json();
    const issue = PojoUtil.getIssueDto(issueResponse.issue);
    IssueCache.set(issue);
    IssueQueue.push({
      issue
    });
  } catch (err) {
    console.error("An update was received from Atlassian, but it could not be processed.", err);
  }
  return new Response();
}
export {
  POST
};

import { w as writable } from "./index2.js";
const issueQueueStore = writable([]);
function push(item) {
  issueQueueStore.update((prev) => [...prev, item]);
}
function subscribe(handle) {
  return issueQueueStore.subscribe((queue) => {
    if (queue.length === 0)
      return;
    for (const item of queue)
      handle(item);
    issueQueueStore.set([]);
  });
}
const IssueQueue = {
  push,
  subscribe
};
export {
  IssueQueue as I
};

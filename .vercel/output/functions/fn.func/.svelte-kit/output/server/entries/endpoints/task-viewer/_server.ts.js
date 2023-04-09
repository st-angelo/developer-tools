import { I as IssueQueue } from "../../../chunks/issueQueueStore.js";
function GET() {
  let unsubscribe;
  const stream = new ReadableStream({
    start(controller) {
      unsubscribe = IssueQueue.subscribe((value) => {
        controller.enqueue(`event: message
data: ${JSON.stringify(value)}

`);
      });
    },
    cancel() {
      unsubscribe();
    }
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
export {
  GET
};

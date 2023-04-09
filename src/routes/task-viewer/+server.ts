import IssueQueue from '$lib/stores/issueQueueStore';

export function GET() {
	let unsubscribe: () => void;

	const stream = new ReadableStream({
		start(controller) {
			unsubscribe = IssueQueue.subscribe((value) => {
				controller.enqueue(`event: message\ndata: ${JSON.stringify(value)}\n\n`);
			});
		},
		cancel() {
			unsubscribe();
		},
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	});
}

import { ATLASSIAN_EMAIL, ATLASSIAN_TOKEN } from '$env/static/private';
import { PUBLIC_ATLASSIAN_CLOUD_URL } from '$env/static/public';
import { Version3Client } from 'jira.js';

const client = new Version3Client({
	host: PUBLIC_ATLASSIAN_CLOUD_URL,
	authentication: {
		basic: {
			email: ATLASSIAN_EMAIL,
			apiToken: ATLASSIAN_TOKEN,
		},
	},
});

export default client;

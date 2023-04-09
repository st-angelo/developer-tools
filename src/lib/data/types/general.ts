export type FormMessage = {
	type: 'error' | 'warning' | 'info';
	content: string;
	persistent?: boolean;
};

export type FormResponse = {
	data?: {
		[key: string]: unknown;
	};
	message?: FormMessage;
};

export type OperationResponse<T = null> =
	| {
			status: 'success';
			data: T;
	  }
	| {
			status: 'error';
			error: string;
	  };

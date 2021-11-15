import { User } from '@firebase/auth';

export interface AuthState {
	error?: null | {
		title?: string;
		message: string;
		retryTrigger?: string;
	};
	success?: string | null;
	isAuth?: boolean;
}

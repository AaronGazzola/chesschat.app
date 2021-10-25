export interface GameState {
	playerIsWhite: boolean;
	error?: null | {
		title?: string;
		message: string;
		retryTrigger?: string;
	};
	success?: string | null;
}
